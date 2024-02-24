/* eslint-disable no-console */
import { QUERY_POSTS_BASIC } from '@app/graphql/posts';
import fetchGraphql from '@app/utils/fetchGraphql';
import { removeDeepProperty } from '@app/utils/general';

const queryAllPostsBasic = async () => {
  let postsData;

  try {
    postsData = await fetchGraphql(QUERY_POSTS_BASIC);
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
