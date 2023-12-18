import { COMMENTS_BY_POST_ID, CREATE_COMMENT } from '@app/graphql/comments';
import {
  CreateCommentMapped,
  mapCommentData,
  mapCreateComment,
} from '@app/utils/comments';
import { getApolloClient } from './apollo-client';

export type CommentFields = {
  author: string;
  authorEmail: string;
  authorUrl?: string;
  content: string;
};

type CreatePostComment = {
  createComment: CreateCommentMapped | null;
};

const queryCommentsByPostId = async (postId: number | string) => {
  const apolloClient = getApolloClient();

  let commentsData;

  try {
    commentsData = await apolloClient.query({
      query: COMMENTS_BY_POST_ID,
      variables: {
        contentId: postId.toString(),
      },
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[comments][getCommentsByPostId] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  if (!commentsData.data.comments) return null;

  const comments = commentsData.data.comments.nodes.map(mapCommentData);

  return {
    comments,
    error: commentsData.error,
  };
};

const mutatePostComment = async (
  postId: number | string,
  commentFields: CommentFields,
  parent?: string
): Promise<CreatePostComment> => {
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

  if (!response.data.createComment) return { createComment: null };

  const createComment: CreateCommentMapped = mapCreateComment(
    response.data.createComment
  );

  return { createComment };
};

const CommentsService = {
  queryCommentsByPostId,
  mutatePostComment,
};

export default CommentsService;
