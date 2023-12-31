import { ApolloQueryResult } from '@apollo/client';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_SITE_OPTIONS } from '@app/graphql/site';
import querySiteOptions from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
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
  } as unknown as ApolloQueryResult<typeof MOCK_SITE_OPTIONS_DATA>;
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
    mockQuery.mockResolvedValue(MOCK_SITE_OPTIONS_RESULT);

    await querySiteOptions();

    expect(mockGetApolloClient).toHaveBeenCalledTimes(1);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockQuery.mockResolvedValue(MOCK_SITE_OPTIONS_RESULT);

    await querySiteOptions();

    expect(mockQuery).toHaveBeenCalledWith({
      query: QUERY_SITE_OPTIONS,
    });
  });

  it('should return the site options if the query is successful', async () => {
    mockQuery.mockResolvedValue(MOCK_SITE_OPTIONS_RESULT);

    const result = await querySiteOptions();

    expect(result).toEqual({
      data: {
        socialMedia: MOCK_SOCIAL_MEDIA,
      },
      errors: null,
    });
  });

  it('should return the errors if the query is unsuccessful', async () => {
    mockQuery.mockResolvedValue(MOCK_ERROR_RESPONSE);

    const result = await querySiteOptions();

    expect(result).toEqual({
      data: {
        socialMedia: undefined,
      },
      errors: [MOCK_ERROR],
    });
  });
});
