import { ApolloQueryResult } from '@apollo/client/core/types';
import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { PostBasic } from '../utils';
import queryAllPostsResume from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryAllPostsResume', () => {
  const MOCK_POSTS_DATA = {
    posts: {
      nodes: [
        {
          id: 1,
          title: 'Post 1',
          slug: 'post-1',
          featuredImage: null,
          author: null,
          template: undefined,
        },
        {
          id: 2,
          title: 'Post 2',
          slug: 'post-2',
          featuredImage: null,
          author: null,
          template: undefined,
        },
      ],
      pageInfo: {
        offsetPagination: {
          hasMore: false,
          hasPrevious: false,
          total: 1,
        },
      },
    },
  };
  const MOCK_POSTS_RESULT = {
    data: MOCK_POSTS_DATA,
    errors: null,
  } as unknown as ApolloQueryResult<typeof MOCK_POSTS_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: null,
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
          featuredImage: null,
          template: undefined,
        },
        {
          id: 2,
          title: 'Post 2',
          slug: 'post-2',
          author: null,
          featuredImage: null,
          template: undefined,
        },
      ],
      pageInfo: {
        hasMore: false,
        hasPrevious: false,
        total: 1,
      },
    },
    errors: null,
  } as unknown as ApiWpReturn<{ posts: PostBasic[] }>;

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts', async () => {
    mockQuery.mockResolvedValue(MOCK_POSTS_RESULT);
    const result = await queryAllPostsResume();
    expect(result).toEqual(postsResult);
  });

  it('should return error', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);
    const result = await queryAllPostsResume();
    expect(result).toEqual({
      data: { pageInfo: undefined, posts: [] },
      errors: [MOCK_ERROR],
    });
  });
});
