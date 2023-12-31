/* eslint-disable no-console */
import { QUERY_POSTS } from '@app/graphql/posts';
import { getApolloClient } from '@app/utils/apollo-client';
import { ApiWpReturn } from '@app/api/api.types';
import { Post, mapPostData } from './utils';

const queryAllPosts = async (): Promise<ApiWpReturn<{ posts: Post[] }>> => {
  const apolloClient = getApolloClient();

  let postsData;

  try {
    postsData = await apolloClient.query({
      query: QUERY_POSTS,
      fetchPolicy: 'no-cache',
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

  const posts = data.posts?.nodes ? data.posts.nodes.map(mapPostData) : [];

  return { data: { posts }, errors };
};

export default queryAllPosts;
