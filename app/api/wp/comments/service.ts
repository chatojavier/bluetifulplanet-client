import { CREATE_COMMENT } from '@app/graphql/comments';
import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Comment, mapCommentData } from './utils';

type CommentFields = {
  author: string;
  authorEmail: string;
  authorUrl?: string;
  content: string;
};

export type MutatePostCommentParams = {
  postId: number | string;
  commentFields: CommentFields;
  parent?: string | null;
};

const mutatePostComment = async ({
  postId,
  commentFields,
  parent,
}: MutatePostCommentParams): Promise<
  ApiWpReturn<{ createdComment: Comment | null }>
> => {
  const { author, authorEmail, authorUrl, content } = commentFields;

  let response;

  try {
    response = await fetchGraphql(CREATE_COMMENT, {
      commentOn: Number(postId),
      author,
      authorEmail,
      authorUrl,
      content,
      parent,
      clientMutationId: `createCommentOn${postId}`,
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

  const createdComment = data.createComment?.comment
    ? mapCommentData(data.createComment.comment)
    : null;

  return { data: { createdComment }, errors };
};

export default mutatePostComment;
