import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import { getApolloClient } from '@app/utils/apollo-client';
import { ApiWpReturn } from '@app/api/api.types';
import { MediaItem, mapMediaItem } from './utils';

const queryMediaItemsById = async (
  mediaItemsId: string[]
): Promise<ApiWpReturn<{ mediaItems: MediaItem[] }>> => {
  const apolloClient = getApolloClient();

  let mediaItemsData;

  try {
    mediaItemsData = await apolloClient.query({
      query: QUERY_MEDIA_ITEMS_BY_ID,
      variables: {
        in: mediaItemsId,
      },
      fetchPolicy: 'no-cache',
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
