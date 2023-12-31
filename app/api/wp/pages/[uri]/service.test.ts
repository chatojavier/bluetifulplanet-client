import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_PAGE_BY_URI } from '@app/graphql/pages';
import queryPageByUri from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
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
    errors: [MOCK_ERROR],
  };

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('should call getApolloClient', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGE_RESPONSE);

    await queryPageByUri(MOCK_URI);

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGE_RESPONSE);

    await queryPageByUri(MOCK_URI);

    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_PAGE_BY_URI,
      variables: {
        uri: MOCK_URI,
      },
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the page if the query is successful', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGE_RESPONSE);

    const result = await queryPageByUri(MOCK_URI);

    expect(result).toEqual({
      data: {
        page: MOCK_PAGE,
      },
      errors: undefined,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryPageByUri(MOCK_URI);

    expect(result).toEqual({
      data: {
        page: null,
      },
      errors: [MOCK_ERROR],
    });
  });
});
