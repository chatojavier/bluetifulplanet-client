import { ApolloQueryResult } from '@apollo/client';
import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_POSTS_BASIC } from '@app/graphql/posts';
import { PostBasic } from '../utils';
import queryAllPostsBasic from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryAllPostsBasic', () => {
  const MOCK_POSTS_DATA = {
    posts: {
      nodes: [
        {
          id: 1,
          title: 'Post 1',
          slug: 'post-1',
          featuredImage: null,
          template: undefined,
        },
        {
          id: 2,
          title: 'Post 2',
          slug: 'post-2',
          featuredImage: null,
          template: undefined,
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
          featuredImage: null,
          template: undefined,
        },
        {
          id: 2,
          title: 'Post 2',
          slug: 'post-2',
          featuredImage: null,
          template: undefined,
        },
      ],
    },
    errors: null,
  } as unknown as ApiWpReturn<{ posts: PostBasic[] }>;

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue({ query: mockQuery });
  });

  it('should return posts data', async () => {
    mockQuery.mockResolvedValueOnce(MOCK_POSTS_RESULT);

    const result = await queryAllPostsBasic();

    expect(result).toEqual(postsResult);
    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_POSTS_BASIC,
      fetchPolicy: 'no-cache',
    });
  });

  it('should return error if query fails', async () => {
    mockQuery.mockResolvedValueOnce(MOCK_ERROR_RESPONSE);

    const result = await queryAllPostsBasic();

    expect(result).toEqual(MOCK_ERROR_RESPONSE);
    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_POSTS_BASIC,
      fetchPolicy: 'no-cache',
    });
  });
});
