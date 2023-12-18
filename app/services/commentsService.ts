import { CreateCommentMapped } from '@app/utils/comments';
import commentsQueries, { CommentFields } from '../apollo/commentsService';
import fetchData from './fetchData';

const postCommentForm = async (
  postId: string | number,
  commentFields: CommentFields,
  parent?: string | null
): Promise<CreateCommentMapped> => {
  const url = '/blog/api';
  return fetchData.post(url, { postId, commentFields, parent });
};

const getCommentsByPostId = async (
  postId: string | number
): Promise<ReturnType<typeof commentsQueries.queryCommentsByPostId>> => {
  const url = `/blog/api/${postId}`;
  return fetchData.get(url);
};

const commentsService = {
  postCommentForm,
  getCommentsByPostId,
};

export default commentsService;
