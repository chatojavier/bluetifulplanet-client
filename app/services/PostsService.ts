/* eslint-disable no-console */
import {
  QUERY_POSTS,
  QUERY_POSTS_BASIC,
  QUERY_POST_BY_URI,
} from '@app/graphql/posts';
import { mapPostData, mapPostsBasic } from '@app/utils/posts';
import { getApolloClient } from './apollo-client';

const getAllPosts = async () => {
  const apolloClient = getApolloClient();

  let postsData;

  try {
    postsData = await apolloClient.query({
      query: QUERY_POSTS,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[posts][getAllPosts] Failed to query post data: ${(e as Error).message}`
    );
    throw e;
  }

  if (!postsData.data.posts) return null;

  const posts = postsData.data.posts?.nodes.map(mapPostData);

  return { posts };
};

const getAllPostsBasic = async () => {
  const apolloClient = getApolloClient();

  let postsData;

  try {
    postsData = await apolloClient.query({
      query: QUERY_POSTS_BASIC,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[posts][getAllPostsBasic] Failed to query post data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  if (!postsData.data.posts) return null;

  const posts = postsData.data.posts.edges.map(mapPostsBasic);

  return { posts };
};

const getPostByUri = async (uri: string) => {
  const apolloClient = getApolloClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_URI,
      variables: {
        uri,
      },
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[posts][getPostByUri] Failed to query post data: ${(e as Error).message}`
    );
    throw e;
  }

  if (!postData.data.post) return null;

  const post = mapPostData(postData.data.post);

  return { post };
};

const PostsService = {
  getAllPosts,
  getAllPostsBasic,
  getPostByUri,
};

export default PostsService;
