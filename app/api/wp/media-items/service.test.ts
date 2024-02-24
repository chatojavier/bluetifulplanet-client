import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import queryMediaItemsById from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryMediaItemsById', () => {
  const MOCK_MEDIA_ITEMS_ID = ['1', '2', '3'];

  const MOCK_MEDIA_ITEMS_DATA = {
    mediaItems: {
      nodes: [
        { id: '1', title: 'Image 1' },
        { id: '2', title: 'Image 2' },
        { id: '3', title: 'Image 3' },
      ],
    },
  };

  const MOCK_MEDIA_ITEMS_RESULT = {
    data: MOCK_MEDIA_ITEMS_DATA,
    errors: [null] as unknown as GraphQLError[],
  };

  const mediaItemsResult = {
    data: {
      mediaItems: [
        { id: '1', title: 'Image 1', mediaTags: [] },
        { id: '2', title: 'Image 2', mediaTags: [] },
        { id: '3', title: 'Image 3', mediaTags: [] },
      ],
    },
    errors: [null] as unknown as GraphQLError[],
  };

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    mockFetchGraphql.mockResolvedValue(MOCK_MEDIA_ITEMS_RESULT);
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    await queryMediaItemsById(MOCK_MEDIA_ITEMS_ID);

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_MEDIA_ITEMS_BY_ID, {
      in: MOCK_MEDIA_ITEMS_ID,
    });
  });

  it('should return the media items data', async () => {
    const result = await queryMediaItemsById(MOCK_MEDIA_ITEMS_ID);

    expect(result).toEqual(mediaItemsResult);
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query media item data';
    mockFetchGraphql.mockRejectedValue(new Error(errorMessage));

    await expect(queryMediaItemsById(MOCK_MEDIA_ITEMS_ID)).rejects.toThrow(
      errorMessage
    );
  });
});
