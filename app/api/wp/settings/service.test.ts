import { ApiWpReturn } from '@app/api/api.types';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_SITE_DATA } from '@app/graphql/site';
import { SiteData } from './utils';
import querySiteData from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
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
  } as unknown as ApolloQueryResult<typeof MOCK_SITE_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: null,
    errors: [MOCK_ERROR],
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

  const mockGetApolloClient = getApolloClient as jest.Mock;

  const mockQuery = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockGetApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  it('returns site data', async () => {
    mockQuery.mockReturnValue(MOCK_SITE_DATA_RESULT);
    const result = await querySiteData();
    expect(result).toEqual(siteDataResult);
  });

  it('returns error', async () => {
    mockQuery.mockReturnValue(MOCK_ERROR_RESPONSE);
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
    mockQuery.mockReturnValue(MOCK_SITE_DATA_RESULT);
    await querySiteData();
    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('calls apolloClient.query with the correct parameters', async () => {
    mockQuery.mockReturnValue(MOCK_SITE_DATA_RESULT);
    await querySiteData();
    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_SITE_DATA,
    });
  });
});
