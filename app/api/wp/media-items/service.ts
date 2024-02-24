import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { MediaItem, mapMediaItem } from './utils';

const queryMediaItemsById = async (
  mediaItemsId: string[]
): Promise<ApiWpReturn<{ mediaItems: MediaItem[] }>> => {
  let mediaItemsData;

  try {
    mediaItemsData = await fetchGraphql(QUERY_MEDIA_ITEMS_BY_ID, {
      in: mediaItemsId,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[mediaItems][queryMediaItemsById] Failed to query media item data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = mediaItemsData;

  const mediaItems = data.mediaItems?.nodes.map(mapMediaItem) ?? [];

  return { data: { mediaItems }, errors };
};

export default queryMediaItemsById;
