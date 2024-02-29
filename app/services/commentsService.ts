import fetchData from '@app/utils/fetchData';
import { ApiRoutes } from '@app/api/api.types';
import { Comment } from '@api/wp/comments/utils';
import { isBrowser } from '@app/utils/general';

export type CommentFields = {
  author: string;
  authorEmail: string;
  authorUrl?: string;
  content: string;
};

export type GetCommentsByPostIdReturn = {
  comments: Comment[];
  commentCount: number;
};

const getCommentsByPostId = async (
  postId: string
): Promise<GetCommentsByPostIdReturn> => {
  if (!isBrowser()) {
    const queryCommentsByPostId = (
      await import('@app/api/wp/comments/[postId]/service')
    ).default;
    const { data, errors } = await queryCommentsByPostId(postId);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get(`${ApiRoutes.COMMENTS}/${postId}`, {
    tags: ['comments'],
  });
};

const postCommentForm = async (
  postId: number | string,
  commentFields: CommentFields,
  parent?: string | null
): Promise<{ createdComment: Comment | null }> => {
  const body = {
    postId,
    commentFields,
    parent,
  };

  if (!isBrowser()) {
    const mutatePostComment = (await import('@api/wp/comments/service'))
      .default;
    const { data, errors } = await mutatePostComment(body);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.post(ApiRoutes.COMMENTS, body);
};

const CommentsService = {
  getCommentsByPostId,
  postCommentForm,
};

export default CommentsService;
