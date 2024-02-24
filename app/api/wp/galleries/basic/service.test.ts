import { QUERY_GALLERIES_BASIC } from '@app/graphql/galleries';
import fetchGraphql from '@app/utils/fetchGraphql';
import { ApiWpReturn } from '@app/api/api.types';
import queryAllGalleriesBasic from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
  } as unknown as ApiWpReturn<typeof MOCK_GALLERIES_DATA>;

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_GALLERIES_RESULT);

    await queryAllGalleriesBasic();

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_GALLERIES_BASIC);
  });

  it('should return the galleries mapped data', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_GALLERIES_RESULT);

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
    mockFetchGraphql.mockRejectedValue(new Error(errorMessage));

    await expect(queryAllGalleriesBasic()).rejects.toThrow(errorMessage);
  });
});
