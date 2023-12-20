import { getApolloClient } from '@app/apollo/apollo-client';
import { CREATE_COMMENT } from '@app/graphql/comments';
import { CreateCommentMapped, mapCreateComment } from '@app/utils/comments';
import { GraphQLError } from 'graphql/error/GraphQLError';

export type CommentFields = {
  author: string;
  authorEmail: string;
  authorUrl?: string;
  content: string;
};

type CreatePostComment = {
  data: CreateCommentMapped | null;
  errors: readonly GraphQLError[] | undefined;
};

export type MutatePostCommentParams = {
  postId: number | string;
  commentFields: CommentFields;
  parent?: string;
};

const mutatePostComment = async ({
  postId,
  commentFields,
  parent,
}: MutatePostCommentParams): Promise<CreatePostComment> => {
  const { author, authorEmail, authorUrl, content } = commentFields;

  const apolloClient = getApolloClient();

  let response;

  try {
    response = await apolloClient.query({
      query: CREATE_COMMENT,
      variables: {
        commentOn: Number(postId),
        author,
        authorEmail,
        authorUrl,
        content,
        parent,
        clientMutationId: `createCommentOn${postId}`,
      },
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[comments][createPostComment] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = response;

  const createComment = data.createComment
    ? mapCreateComment(data.createComment)
    : null;

  return { data: createComment, errors };
};

export default mutatePostComment;
