import { ApolloQueryResult } from '@apollo/client';
import { QUERY_PAGES } from '@app/graphql/pages';
import { getApolloClient } from '@app/utils/apollo-client';
import { PageFieldsFragment } from '@app/graphql/__generated__/graphql';
import queryAllPages from './service';
import { mapPageData } from './utils';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryAllPages', () => {
  const MOCK_PAGES_DATA = {
    pages: {
      nodes: [
        {
          id: 1,
          title: 'Page 1',
          slug: 'page-1',
          content: 'Page 1 content',
        },
        {
          id: 2,
          title: 'Page 2',
          slug: 'page-2',
          content: 'Page 2 content',
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
    mockQuery.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPages();

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPages();

    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_PAGES,
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the pages if the query is successful', async () => {
    mockQuery.mockResolvedValue(MOCK_PAGES_RESULT);

    const result = await queryAllPages();

    expect(result).toEqual({
      data: {
        pages: (
          MOCK_PAGES_DATA.pages.nodes as unknown as PageFieldsFragment[]
        ).map(mapPageData),
      },
      errors: null,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryAllPages();

    expect(result).toEqual({
      data: { pages: [] },
      errors: MOCK_ERROR_RESPONSE.errors,
    });
  });
});
