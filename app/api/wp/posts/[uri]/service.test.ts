import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import { PostBasic } from '../utils';
import queryPostByUri from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
  } as unknown as ApiWpReturn<typeof MOCK_POST_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { post: null },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
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

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  it('should return post data', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_POST_RESULT);

    const result = await queryPostByUri('post-1');

    expect(result).toEqual(postResult);
  });

  it('should return error', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryPostByUri('post-1');

    expect(result).toEqual({
      data: { post: null },
      errors: [MOCK_ERROR],
    });
  });

  it('should throw error', async () => {
    mockFetchGraphql.mockRejectedValue(MOCK_ERROR);

    await expect(queryPostByUri('post-1')).rejects.toEqual(MOCK_ERROR);
  });
});
