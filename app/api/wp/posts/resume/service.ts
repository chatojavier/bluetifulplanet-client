/* eslint-disable no-console */
import { QUERY_POSTS_RESUME } from '@app/graphql/posts';
import { mapPostResumeData } from '@app/utils/posts';
import { getApolloClient } from '@app/apollo/apollo-client';

const queryAllPostsResume = async (offset = 0, size = 10) => {
  const apolloClient = getApolloClient();

  let postsData;

  try {
    postsData = await apolloClient.query({
      query: QUERY_POSTS_RESUME,
      fetchPolicy: 'no-cache',
      variables: {
        offsetPagination: {
          offset,
          size,
        },
      },
    });
  } catch (e) {
    console.log(
      `[posts][queryAllPosts] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = postsData;

  const posts = data?.posts?.nodes
    ? data.posts.nodes.map(mapPostResumeData)
    : [];
  const pageInfo = data?.posts?.pageInfo.offsetPagination;

  return { data: { posts, pageInfo }, errors };
};

export default queryAllPostsResume;
