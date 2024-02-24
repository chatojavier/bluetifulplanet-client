import { QUERY_PAGE_BY_URI } from '@app/graphql/pages';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import queryPageByUri from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryPageByUri', () => {
  const MOCK_URI = 'MOCK_URI';
  const MOCK_PAGE = {
    id: 1,
    title: 'MOCK_PAGE',
    slug: 'MOCK_PAGE',
    content: 'MOCK_PAGE',
    featuredImage: null,
    template: null,
  };
  const MOCK_PAGE_RESPONSE = {
    data: {
      page: MOCK_PAGE,
    },
  };
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { page: null },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
  };

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGE_RESPONSE);

    await queryPageByUri(MOCK_URI);

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGE_RESPONSE);

    await queryPageByUri(MOCK_URI);

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_PAGE_BY_URI, {
      uri: MOCK_URI,
    });
  });

  it('should return the page if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGE_RESPONSE);

    const result = await queryPageByUri(MOCK_URI);

    expect(result).toEqual({
      data: {
        page: MOCK_PAGE,
      },
      errors: undefined,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryPageByUri(MOCK_URI);

    expect(result).toEqual({
      data: {
        page: null,
      },
      errors: [MOCK_ERROR],
    });
  });
});
