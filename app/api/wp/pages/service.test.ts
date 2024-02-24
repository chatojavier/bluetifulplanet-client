import { QUERY_PAGES } from '@app/graphql/pages';
import { PageFieldsFragment } from '@app/graphql/__generated__/graphql';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import { ApiWpReturn } from '@app/api/api.types';
import queryAllPages from './service';
import { mapPageData } from './utils';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
  } as unknown as ApiWpReturn<typeof MOCK_PAGES_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { pages: null },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
  };

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPages();

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPages();

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_PAGES);
  });

  it('should return the pages if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGES_RESULT);

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
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryAllPages();

    expect(result).toEqual({
      data: { pages: [] },
      errors: MOCK_ERROR_RESPONSE.errors,
    });
  });
});
