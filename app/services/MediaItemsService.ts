import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import { removeDeepProperty } from '@app/utils/general';
import { getApolloClient } from './apollo-client';

const getMediaItemsById = async (mediaItemsId: string[]) => {
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
    console.log(
      `[mediaItems][getMediaItemsById] Failed to query media item data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  if (!mediaItemsData.data.mediaItems) return null;

  const mediaItems = mediaItemsData.data.mediaItems?.nodes.map(photo =>
    removeDeepProperty(photo, '__typename')
  );

  return { mediaItems };
};

const MediaItemsService = {
  getMediaItemsById,
};

export default MediaItemsService;
