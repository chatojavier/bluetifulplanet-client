/* eslint-disable no-console */
import {
  QUERY_POSTS,
  QUERY_POSTS_BASIC,
  QUERY_POSTS_RESUME,
  QUERY_POST_BY_URI,
} from '@app/graphql/posts';
import { mapPostData, mapPostResumeData } from '@app/utils/posts';
import { removeDeepProperty } from '@app/utils/general';
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

const getAllPostsResume = async (offset = 0, size = 10) => {
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
      `[posts][getAllPosts] Failed to query post data: ${(e as Error).message}`
    );
    throw e;
  }

  if (!postsData.data.posts) return null;

  const posts = postsData.data.posts.nodes.map(mapPostResumeData);
  const pageInfo = postsData.data.posts.pageInfo.offsetPagination;

  return { posts, pageInfo };
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

  const posts = postsData.data.posts.nodes.map(node =>
    removeDeepProperty(node, '__typename')
  );

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
  getAllPostsResume,
  getAllPostsBasic,
  getPostByUri,
};

export default PostsService;
