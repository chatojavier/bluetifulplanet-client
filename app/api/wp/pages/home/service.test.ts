import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_HOME_PAGE } from '@app/graphql/pages';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import { PageBasic } from '../utils';
import queryHomePage from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
  } as unknown as ApiWpReturn<typeof MOCK_PAGE_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { page: null },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
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

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGE_RESULT);

    await queryHomePage();

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGE_RESULT);

    await queryHomePage();

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_HOME_PAGE);
  });

  it('should return the page if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGE_RESULT);

    const result = await queryHomePage();

    expect(result).toEqual(pageResult);
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryHomePage();

    expect(result).toEqual({
      data: {
        page: null,
      },
      errors: [MOCK_ERROR],
    });
  });
});
