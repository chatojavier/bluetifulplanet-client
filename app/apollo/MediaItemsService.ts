import { QUERY_MEDIA_ITEMS_BY_ID } from '@app/graphql/mediaItems';
import { removeDeepProperty } from '@app/utils/general';
import { MediaItemsByIdQuery } from '@app/graphql/__generated__/graphql';
import { DeepOmit } from '@apollo/client/utilities';
import { getApolloClient } from './apollo-client';

export type MediaItemComplete = DeepOmit<
  Omit<
    NonNullable<MediaItemsByIdQuery['mediaItems']>['nodes'][0],
    'mediaTags'
  > & {
    mediaTags:
      | NonNullable<
          NonNullable<
            MediaItemsByIdQuery['mediaItems']
          >['nodes'][0]['mediaTags']
        >['nodes']
      | undefined;
  },
  '__typename'
>;

type QueryMediaItemsByIdResponse = {
  mediaItems: MediaItemComplete[];
};

const queryMediaItemsById = async (
  mediaItemsId: string[]
): Promise<QueryMediaItemsByIdResponse | null> => {
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

  if (!mediaItemsData.data.mediaItems) return null;

  const mediaItems = mediaItemsData.data.mediaItems?.nodes.map(photo => {
    const mediaItemUpdated = {
      ...photo,
      mediaTags: photo.mediaTags?.nodes.map(tag => tag),
    };
    return removeDeepProperty(mediaItemUpdated, '__typename');
  });

  return { mediaItems };
};

const MediaItemsService = {
  queryMediaItemsById,
};

export default MediaItemsService;
