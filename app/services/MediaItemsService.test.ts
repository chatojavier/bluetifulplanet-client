import fetchData from '@app/utils/fetchData';
import { isBrowser } from '@app/utils/general';
import queryMediaItemsById from '@app/api/wp/media-items/service';
import { ApiRoutes } from '@app/api/api.types';
import MediaItemsService from './MediaItemsService';

jest.mock('@app/api/wp/media-items/service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@app/utils/fetchData', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

jest.mock('@app/utils/general', () => ({
  __esModule: true,
  isBrowser: jest.fn(),
}));

describe('MediaItemsService', () => {
  const MOCK_MEDIA_ITEMS_ID = ['123', '456', '789'];
  const MOCK_MEDIA_ITEMS_DATA = {
    mediaItems: [
      {
        id: '123',
        title: 'Media Item 1',
        sourceUrl: 'https://example.com/media-item-1.jpg',
      },
      {
        id: '456',
        title: 'Media Item 2',
        sourceUrl: 'https://example.com/media-item-2.jpg',
      },
      {
        id: '789',
        title: 'Media Item 3',
        sourceUrl: 'https://example.com/media-item-3.jpg',
      },
    ],
  };
  const MOCK_MEDIA_ITEMS_RESPONSE = {
    data: MOCK_MEDIA_ITEMS_DATA,
    errors: null,
  };
  const MOCK_MEDIA_ITEMS_ERROR = 'MOCK_MEDIA_ITEMS_ERROR';

  const mockIsBrowser = isBrowser as jest.Mock;
  const mockQueryMediaItemsById = queryMediaItemsById as jest.Mock;

  describe('getMediaItemsById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call getMediaItemsById with the correct parameters', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockQueryMediaItemsById.mockResolvedValue(MOCK_MEDIA_ITEMS_RESPONSE);

      await MediaItemsService.getMediaItemsById(MOCK_MEDIA_ITEMS_ID);

      expect(mockQueryMediaItemsById).toHaveBeenCalledWith(MOCK_MEDIA_ITEMS_ID);
    });

    it('should throw an error if the response contains errors', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockQueryMediaItemsById.mockResolvedValue({
        ...MOCK_MEDIA_ITEMS_RESPONSE,
        errors: [{ message: MOCK_MEDIA_ITEMS_ERROR }],
      });

      await expect(
        MediaItemsService.getMediaItemsById(MOCK_MEDIA_ITEMS_ID)
      ).rejects.toThrowError(MOCK_MEDIA_ITEMS_ERROR);
    });

    it('should call fetchData.get with the correct parameters', async () => {
      mockIsBrowser.mockReturnValue(true);
      (fetchData.get as jest.Mock).mockResolvedValue(MOCK_MEDIA_ITEMS_RESPONSE);

      await MediaItemsService.getMediaItemsById(MOCK_MEDIA_ITEMS_ID);

      expect(fetchData.get).toHaveBeenCalledWith(
        `${ApiRoutes.MEDIA_ITEMS}?ids=${MOCK_MEDIA_ITEMS_ID.join(',')}`
      );
    });

    it('should throw an error fetchData throw errors', async () => {
      mockIsBrowser.mockReturnValue(true);
      (fetchData.get as jest.Mock).mockRejectedValue(
        new Error(MOCK_MEDIA_ITEMS_ERROR)
      );

      await expect(
        MediaItemsService.getMediaItemsById(MOCK_MEDIA_ITEMS_ID)
      ).rejects.toThrowError(MOCK_MEDIA_ITEMS_ERROR);
    });
  });
});
