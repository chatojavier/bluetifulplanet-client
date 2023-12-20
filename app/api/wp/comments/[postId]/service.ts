import { getApolloClient } from '@app/apollo/apollo-client';
import { COMMENTS_BY_POST_ID } from '@app/graphql/comments';
import { mapCommentData } from '@app/utils/comments';

const queryCommentsByPostId = async (postId: string) => {
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

  const { data, errors } = commentsData;

  const comments = data?.comments?.nodes
    ? data.comments.nodes.map(mapCommentData)
    : [];

  return {
    data: { comments },
    errors,
  };
};

export default queryCommentsByPostId;
