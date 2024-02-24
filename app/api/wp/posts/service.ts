/* eslint-disable no-console */
import { QUERY_POSTS } from '@app/graphql/posts';
import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Post, mapPostData } from './utils';

const queryAllPosts = async (): Promise<ApiWpReturn<{ posts: Post[] }>> => {
  let postsData;

  try {
    postsData = await fetchGraphql(QUERY_POSTS);
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
