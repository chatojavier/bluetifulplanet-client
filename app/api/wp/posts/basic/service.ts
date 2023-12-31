/* eslint-disable no-console */
import { QUERY_POSTS_BASIC } from '@app/graphql/posts';
import { getApolloClient } from '@app/utils/apollo-client';
import { removeDeepProperty } from '@app/utils/general';

const queryAllPostsBasic = async () => {
  const apolloClient = getApolloClient();

  let postsData;

  try {
    postsData = await apolloClient.query({
      query: QUERY_POSTS_BASIC,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[posts][queryAllPostsBasic] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = postsData;

  const posts = data?.posts?.nodes
    ? data.posts.nodes.map(node => removeDeepProperty(node, '__typename'))
    : [];

  return { data: { posts }, errors };
};

export default queryAllPostsBasic;
