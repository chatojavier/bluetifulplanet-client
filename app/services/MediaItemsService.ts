import fetchData from '@app/utils/fetchData';
import { ApiRoutes } from '@app/api/api.types';
import { MediaItem } from '@app/api/wp/media-items/utils';
import { isBrowser } from '@app/utils/general';

const getMediaItemsById = async (mediaItemsId: string[]) => {
  if (!isBrowser()) {
    const queryMediaItemsById = (
      await import('@app/api/wp/media-items/service')
    ).default;
    const { data, errors } = await queryMediaItemsById(mediaItemsId);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ mediaItems: MediaItem[] }>(
    `${ApiRoutes.MEDIA_ITEMS}?ids=${mediaItemsId.join(',')}`
  );
};

const MediaItemsService = {
  getMediaItemsById,
};

export default MediaItemsService;
