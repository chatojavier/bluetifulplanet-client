import { ApolloQueryResult } from '@apollo/client';
import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_PAGES_BASIC } from '@app/graphql/pages';
import { PageBasic } from '../utils';
import queryAllPagesBasic from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryAllPagesBasic', () => {
  const MOCK_PAGES_DATA = {
    pages: {
      nodes: [
        {
          id: 1,
          title: 'Page 1',
          slug: 'page-1',
          featuredImage: null,
          template: null,
        },
        {
          id: 2,
          title: 'Page 2',
          slug: 'page-2',
          featuredImage: null,
          template: null,
        },
      ],
    },
  };
  const MOCK_PAGES_RESULT = {
    data: MOCK_PAGES_DATA,
    errors: null,
  } as unknown as ApolloQueryResult<typeof MOCK_PAGES_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { pages: [] },
    errors: [MOCK_ERROR],
  };

  const pagesResult = {
    data: {
      pages: [
        {
          id: 1,
          title: 'Page 1',
          slug: 'page-1',
          featuredImage: null,
          template: undefined,
        },
        {
          id: 2,
          title: 'Page 2',
          slug: 'page-2',
          featuredImage: null,
          template: undefined,
        },
      ],
    },
    errors: null,
  } as unknown as ApiWpReturn<{ pages: PageBasic[] }>;

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('should call getApolloClient', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPagesBasic();

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPagesBasic();

    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_PAGES_BASIC,
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the pages if the query is successful', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGES_RESULT);

    const result = await queryAllPagesBasic();

    expect(result).toEqual(pagesResult);
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryAllPagesBasic();

    expect(result).toEqual(MOCK_ERROR_RESPONSE);
  });
});
