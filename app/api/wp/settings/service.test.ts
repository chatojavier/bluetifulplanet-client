import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_SITE_DATA } from '@app/graphql/site';
import { GraphQLError } from 'graphql';
import fetchGraphql from '@app/utils/fetchGraphql';
import { SiteData } from './utils';
import querySiteData from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const siteTitle = 'Site Title';

describe('querySiteData', () => {
  const MOCK_SITE_DATA = {
    generalSettings: {
      title: siteTitle,
      description: 'Site description.',
    },
    favicon: {
      mediaDetails: {
        sizes: [
          {
            sourceUrl: 'https://example.com/favicon-32.ico',
            width: 32,
          },
          {
            sourceUrl: 'https://example.com/favicon-192.ico',
            width: 192,
          },
        ],
      },
    },
  };
  const MOCK_SITE_DATA_RESULT = {
    data: MOCK_SITE_DATA,
    errors: null,
  } as unknown as ApiWpReturn<typeof MOCK_SITE_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: null,
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
  };

  const siteDataResult = {
    data: {
      title: siteTitle,
      siteTitle,
      description: 'Site description.',
      language: 'en',
      favicon: [
        {
          sourceUrl: 'https://example.com/favicon-32.ico',
          width: 32,
        },
        {
          sourceUrl: 'https://example.com/favicon-192.ico',
          width: 192,
        },
      ],
    },
    errors: null,
  } as unknown as ApiWpReturn<SiteData>;

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns site data', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_SITE_DATA_RESULT);
    const result = await querySiteData();
    expect(result).toEqual(siteDataResult);
  });

  it('returns error', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);
    const result = await querySiteData();
    expect(result).toEqual({
      data: {
        description: undefined,
        language: 'en',
        siteTitle: undefined,
        title: undefined,
      },
      errors: [MOCK_ERROR],
    });
  });

  it('calls getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_SITE_DATA_RESULT);
    await querySiteData();
    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('calls apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_SITE_DATA_RESULT);
    await querySiteData();
    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_SITE_DATA);
  });
});
