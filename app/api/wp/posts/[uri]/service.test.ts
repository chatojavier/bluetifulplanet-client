import { ApolloQueryResult } from '@apollo/client';
import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { PostBasic } from '../utils';
import queryPostByUri from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryPostByUri', () => {
  const MOCK_POST_DATA = {
    post: {
      id: 1,
      title: 'Post 1',
      slug: 'post-1',
      author: null,
      comments: null,
      tags: null,
      featuredImage: null,
      template: undefined,
    },
  };
  const MOCK_POST_RESULT = {
    data: MOCK_POST_DATA,
    errors: null,
  } as unknown as ApolloQueryResult<typeof MOCK_POST_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { post: null },
    errors: [MOCK_ERROR],
  };

  const postResult = {
    data: {
      post: {
        id: 1,
        title: 'Post 1',
        slug: 'post-1',
        author: null,
        comments: null,
        tags: null,
        featuredImage: null,
        template: undefined,
      },
    },
    errors: null,
  } as unknown as ApiWpReturn<{ post: PostBasic }>;

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('should return post data', async () => {
    mockQuery.mockResolvedValue(MOCK_POST_RESULT);

    const result = await queryPostByUri('post-1');

    expect(result).toEqual(postResult);
  });

  it('should return error', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryPostByUri('post-1');

    expect(result).toEqual({
      data: { post: null },
      errors: [MOCK_ERROR],
    });
  });

  it('should throw error', async () => {
    mockQuery.mockRejectedValue(MOCK_ERROR);

    await expect(queryPostByUri('post-1')).rejects.toEqual(MOCK_ERROR);
  });
});
