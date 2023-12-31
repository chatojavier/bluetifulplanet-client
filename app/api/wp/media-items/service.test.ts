import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import queryMediaItemsById from './service';

jest.mock('@app/utils/apollo-client', () => ({
  getApolloClient: jest.fn(),
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
    errors: null,
  };

  const mockApolloClient = {
    query: jest.fn().mockResolvedValue(MOCK_MEDIA_ITEMS_RESULT),
  };

  const mediaItemsResult = {
    data: {
      mediaItems: [
        { id: '1', title: 'Image 1', mediaTags: [] },
        { id: '2', title: 'Image 2', mediaTags: [] },
        { id: '3', title: 'Image 3', mediaTags: [] },
      ],
    },
    errors: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getApolloClient as jest.Mock).mockReturnValue(mockApolloClient);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    await queryMediaItemsById(MOCK_MEDIA_ITEMS_ID);

    expect(mockApolloClient.query).toHaveBeenCalledWith({
      query: QUERY_MEDIA_ITEMS_BY_ID,
      variables: {
        in: MOCK_MEDIA_ITEMS_ID,
      },
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the media items data', async () => {
    const result = await queryMediaItemsById(MOCK_MEDIA_ITEMS_ID);

    expect(result).toEqual(mediaItemsResult);
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query media item data';
    mockApolloClient.query.mockRejectedValue(new Error(errorMessage));

    await expect(queryMediaItemsById(MOCK_MEDIA_ITEMS_ID)).rejects.toThrow(
      errorMessage
    );
  });
});
