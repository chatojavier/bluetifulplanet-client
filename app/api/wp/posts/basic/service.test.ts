import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_POSTS_BASIC } from '@app/graphql/posts';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import { PostBasic } from '../utils';
import queryAllPostsBasic from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts data', async () => {
    mockFetchGraphql.mockResolvedValueOnce(MOCK_POSTS_RESULT);

    const result = await queryAllPostsBasic();

    expect(result).toEqual(postsResult);
    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_POSTS_BASIC);
  });

  it('should return error if query fails', async () => {
    mockFetchGraphql.mockResolvedValueOnce(MOCK_ERROR_RESPONSE);

    const result = await queryAllPostsBasic();

    expect(result).toEqual(MOCK_ERROR_RESPONSE);
    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_POSTS_BASIC);
  });
});
