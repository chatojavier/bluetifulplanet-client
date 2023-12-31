import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_GALLERIES_BASIC } from '@app/graphql/galleries';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import queryAllGalleriesBasic from './service';

jest.mock('@app/utils/apollo-client', () => ({
  __esModule: true,
  getApolloClient: jest.fn(),
}));

describe('queryAllGalleriesBasic', () => {
  const MOCK_GALLERIES_DATA = {
    galleries: {
      nodes: [
        {
          id: 1,
          title: 'Gallery 1',
          images: [
            { id: 1, url: 'image1.jpg' },
            { id: 2, url: 'image2.jpg' },
          ],
        },
        {
          id: 2,
          title: 'Gallery 2',
          images: [
            { id: 3, url: 'image3.jpg' },
            { id: 4, url: 'image4.jpg' },
          ],
        },
      ],
    },
  };
  const MOCK_GALLERIES_RESULT = {
    data: MOCK_GALLERIES_DATA,
    errors: null,
  } as unknown as ApolloQueryResult<typeof MOCK_GALLERIES_DATA>;

  const mockApolloClient = {
    query: jest.fn() as jest.MockedFn<
      ApolloClient<NormalizedCacheObject>['query']
    >,
  } as unknown as ApolloClient<NormalizedCacheObject>;

  const getApolloClientMock = getApolloClient as jest.MockedFunction<
    typeof getApolloClient
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    jest
      .spyOn(mockApolloClient, 'query')
      .mockResolvedValue(MOCK_GALLERIES_RESULT);
    getApolloClientMock.mockReturnValue(mockApolloClient);

    await queryAllGalleriesBasic();

    expect(mockApolloClient.query).toHaveBeenCalledWith({
      query: QUERY_GALLERIES_BASIC,
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the galleries mapped data', async () => {
    jest
      .spyOn(mockApolloClient, 'query')
      .mockResolvedValue(MOCK_GALLERIES_RESULT);
    getApolloClientMock.mockReturnValue(mockApolloClient);

    const result = await queryAllGalleriesBasic();

    expect(result).toEqual({
      data: {
        galleries: [
          {
            id: 1,
            title: 'Gallery 1',
            images: [
              { id: 1, url: 'image1.jpg' },
              { id: 2, url: 'image2.jpg' },
            ],
          },
          {
            id: 2,
            title: 'Gallery 2',
            images: [
              { id: 3, url: 'image3.jpg' },
              { id: 4, url: 'image4.jpg' },
            ],
          },
        ],
      },
      errors: null,
    });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query page data';
    jest
      .spyOn(mockApolloClient, 'query')
      .mockRejectedValue(new Error(errorMessage));

    getApolloClientMock.mockReturnValue(mockApolloClient);

    await expect(queryAllGalleriesBasic()).rejects.toThrow(errorMessage);
  });
});
