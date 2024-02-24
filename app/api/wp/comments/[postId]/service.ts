import { COMMENTS_BY_POST_ID } from '@app/graphql/comments';
import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Comment, mapCommentData } from '../utils';

const queryCommentsByPostId = async (
  postId: string
): Promise<ApiWpReturn<{ comments: Comment[] }>> => {
  let commentsData;

  try {
    commentsData = await fetchGraphql(
      COMMENTS_BY_POST_ID,
      {
        contentId: postId.toString(),
      },
      {
        cache: 'no-store',
      }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[comments][queryCommentsByPostId] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = commentsData;

  if ((commentsData as unknown as Error)?.message)
    throw new Error('Wordpress server error');

  const comments = data?.comments?.nodes
    ? data.comments.nodes.map(mapCommentData)
    : [];

  return {
    data: { comments },
    errors,
  };
};

export default queryCommentsByPostId;
