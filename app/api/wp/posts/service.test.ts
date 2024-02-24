import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_POSTS } from '@app/graphql/posts';
import { GraphQLError } from 'graphql';
import fetchGraphql from '@app/utils/fetchGraphql';
import { PostBasic } from './utils';
import queryAllPosts from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryAllPosts', () => {
  const MOCK_POSTS_DATA = {
    posts: {
      nodes: [
        {
          id: 1,
          title: 'Post 1',
          slug: 'post-1',
          featuredImage: null,
          template: null,
        },
        {
          id: 2,
          title: 'Post 2',
          slug: 'post-2',
          featuredImage: null,
          template: null,
        },
      ],
    },
  };
  const MOCK_POSTS_RESULT = {
    data: MOCK_POSTS_DATA,
    errors: null,
  } as unknown as ApiWpReturn<typeof MOCK_POSTS_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { posts: [] },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
  };

  const postsResult = {
    data: {
      posts: [
        {
          id: 1,
          title: 'Post 1',
          slug: 'post-1',
          author: null,
          comments: null,
          tags: null,
          featuredImage: null,
          template: null,
        },
        {
          id: 2,
          title: 'Post 2',
          slug: 'post-2',
          author: null,
          comments: null,
          tags: null,
          featuredImage: null,
          template: null,
        },
      ],
    },
    errors: null,
  } as unknown as ApiWpReturn<{ posts: PostBasic[] }>;

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_POSTS_RESULT);

    await queryAllPosts();

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_POSTS_RESULT);

    await queryAllPosts();

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_POSTS);
  });

  it('should return the correct data', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_POSTS_RESULT);

    const result = await queryAllPosts();

    expect(result).toEqual(postsResult);
  });

  it('should return the correct error', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryAllPosts();

    expect(result).toEqual({
      data: { posts: [] },
      errors: [MOCK_ERROR],
    });
  });
});
