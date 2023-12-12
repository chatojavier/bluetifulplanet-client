import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import { removeDeepProperty } from '@app/utils/general';
import { MediaItemsByIdQuery } from '@app/graphql/__generated__/graphql';
import { DeepOmit } from '@apollo/client/utilities';
import { getApolloClient } from './apollo-client';

export type MediaItemComplete = DeepOmit<
  NonNullable<MediaItemsByIdQuery['mediaItems']>['nodes'][0],
  '__typename'
>;

type GetMediaItemsByIdResponse = {
  mediaItems: MediaItemComplete[];
};

const getMediaItemsById = async (
  mediaItemsId: string[]
): Promise<GetMediaItemsByIdResponse | null> => {
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
