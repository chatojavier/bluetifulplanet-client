import { ApolloQueryResult } from '@apollo/client/core/types';
import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_POSTS } from '@app/graphql/posts';
import { PostBasic } from './utils';
import queryAllPosts from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
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
  } as unknown as ApolloQueryResult<typeof MOCK_POSTS_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { posts: [] },
    errors: [MOCK_ERROR],
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

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('should call getApolloClient', async () => {
    mockQuery.mockResolvedValue(MOCK_POSTS_RESULT);

    await queryAllPosts();

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_POSTS_RESULT);

    await queryAllPosts();

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_POSTS,
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the correct data', async () => {
    mockQuery.mockResolvedValue(MOCK_POSTS_RESULT);

    const result = await queryAllPosts();

    expect(result).toEqual(postsResult);
  });

  it('should return the correct error', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryAllPosts();

    expect(result).toEqual({
      data: { posts: [] },
      errors: [MOCK_ERROR],
    });
  });
});
