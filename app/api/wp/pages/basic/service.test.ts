import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_PAGES_BASIC } from '@app/graphql/pages';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import { PageBasic } from '../utils';
import queryAllPagesBasic from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
  } as unknown as ApiWpReturn<typeof MOCK_PAGES_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { pages: [] },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
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

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPagesBasic();

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGES_RESULT);

    await queryAllPagesBasic();

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_PAGES_BASIC);
  });

  it('should return the pages if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_PAGES_RESULT);

    const result = await queryAllPagesBasic();

    expect(result).toEqual(pagesResult);
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await queryAllPagesBasic();

    expect(result).toEqual(MOCK_ERROR_RESPONSE);
  });
});
