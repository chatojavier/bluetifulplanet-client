import { QUERY_SITE_OPTIONS } from '@app/graphql/site';
import fetchGraphql from '@app/utils/fetchGraphql';
import { ApiWpReturn } from '@app/api/api.types';
import { GraphQLError } from 'graphql';
import querySiteOptions from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('querySiteOptions', () => {
  const MOCK_SOCIAL_MEDIA = {
    facebook: 'https://www.facebook.com/MOCK_FACEBOOK',
    instagram: 'https://www.instagram.com/MOCK_INSTAGRAM',
    twitter: 'https://www.twitter.com/MOCK_TWITTER',
  };
  const MOCK_SITE_OPTIONS_DATA = {
    optionsPage: {
      socialMedia: MOCK_SOCIAL_MEDIA,
    },
  };
  const MOCK_SITE_OPTIONS_RESULT = {
    data: MOCK_SITE_OPTIONS_DATA,
    errors: null,
  } as unknown as ApiWpReturn<typeof MOCK_SITE_OPTIONS_DATA>;
  const MOCK_ERROR = 'MOCK_ERROR';
  const MOCK_ERROR_RESPONSE = {
    data: { optionsPage: null },
    errors: [MOCK_ERROR] as unknown as GraphQLError[],
  };

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getApolloClient', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_SITE_OPTIONS_RESULT);

    await querySiteOptions();

    expect(mockFetchGraphql).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_SITE_OPTIONS_RESULT);

    await querySiteOptions();

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_SITE_OPTIONS);
  });

  it('should return the site options if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_SITE_OPTIONS_RESULT);

    const result = await querySiteOptions();

    expect(result).toEqual({
      data: {
        socialMedia: MOCK_SOCIAL_MEDIA,
      },
      errors: null,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await querySiteOptions();

    expect(result).toEqual({
      data: {
        socialMedia: undefined,
      },
      errors: [MOCK_ERROR],
    });
  });
});
