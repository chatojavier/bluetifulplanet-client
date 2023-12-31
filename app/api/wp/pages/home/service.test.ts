import { ApolloQueryResult } from '@apollo/client';
import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_HOME_PAGE } from '@app/graphql/pages';
import { PageBasic } from '../utils';
import queryHomePage from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryHomePage', () => {
  const MOCK_PAGE_DATA = {
    page: {
      id: 1,
      title: 'Home',
      slug: 'home',
      featuredImage: null,
      template: null,
    },
  };
  const MOCK_PAGE_RESULT = {
    data: MOCK_PAGE_DATA,
    errors: null,
  } as unknown as ApolloQueryResult<typeof MOCK_PAGE_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { page: null },
    errors: [MOCK_ERROR],
  };

  const pageResult = {
    data: {
      page: {
        id: 1,
        title: 'Home',
        slug: 'home',
        featuredImage: null,
        template: null,
      },
    },
    errors: null,
  } as unknown as ApiWpReturn<{ page: PageBasic }>;

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('should call getApolloClient', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGE_RESULT);

    await queryHomePage();

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGE_RESULT);

    await queryHomePage();

    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_HOME_PAGE,
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the page if the query is successful', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGE_RESULT);

    const result = await queryHomePage();

    expect(result).toEqual(pageResult);
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryHomePage();

    expect(result).toEqual({
      data: {
        page: null,
      },
      errors: [MOCK_ERROR],
    });
  });
});
