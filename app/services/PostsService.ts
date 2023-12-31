/* eslint-disable no-console */
import fetchData from '@app/utils/fetchData';
import { ApiRoutes } from '@api/api.types';
import { Post, PostBasic, PostResume } from '@api/wp/posts/utils';
import {
  Maybe,
  OffsetPaginationPageInfo,
} from '@app/graphql/__generated__/graphql';
import { isBrowser } from '@app/utils/general';
import queryAllPosts from '@app/api/wp/posts/service';
import queryAllPostsResume from '@app/api/wp/posts/resume/service';
import queryAllPostsBasic from '@app/api/wp/posts/basic/service';
import queryPostByUri from '@app/api/wp/posts/[uri]/service';

const getAllPosts = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllPosts();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ posts: Post[] }>(ApiRoutes.POSTS);
};

const getAllPostsResume = async (offset = 0, size = 10) => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllPostsResume(offset, size);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{
    posts: PostResume[];
    pageInfo: Maybe<OffsetPaginationPageInfo> | undefined;
  }>(`${ApiRoutes.POSTS_RESUME}?offset=${offset}&size=${size}`);
};

const getAllPostsBasic = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllPostsBasic();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ posts: PostBasic[] }>(ApiRoutes.POSTS_BASIC);
};

const getPostByUri = async (uri: string) => {
  if (!isBrowser()) {
    const { data, errors } = await queryPostByUri(uri);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ post: Post }>(`${ApiRoutes.POSTS}/${uri}`);
};

const PostsService = {
  getAllPosts,
  getAllPostsResume,
  getAllPostsBasic,
  getPostByUri,
};

export default PostsService;
