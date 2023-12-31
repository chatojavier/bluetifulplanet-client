/* eslint-disable no-console */
import { QUERY_POSTS_RESUME } from '@app/graphql/posts';
import { getApolloClient } from '@app/utils/apollo-client';
import { ApiWpReturn } from '@app/api/api.types';
import {
  Maybe,
  OffsetPaginationPageInfo,
} from '@app/graphql/__generated__/graphql';
import { PostResume, mapPostResumeData } from '../utils';

const queryAllPostsResume = async (
  offset = 0,
  size = 10
): Promise<
  ApiWpReturn<{
    posts: PostResume[];
    pageInfo: Maybe<OffsetPaginationPageInfo> | undefined;
  }>
> => {
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
