import { DeepOmit } from '@app/types/general';
import { MediaItemsByIdQuery } from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from '@app/utils/general';

export type QueryMediaItem = NonNullable<
  MediaItemsByIdQuery['mediaItems']
>['nodes'][number];

export type MediaItem = DeepOmit<
  Omit<QueryMediaItem, 'mediaTags'> & {
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

export const mapMediaItem = (queryMediaItem: QueryMediaItem): MediaItem => {
  const mediaItem = {
    ...queryMediaItem,
    mediaTags: queryMediaItem.mediaTags?.nodes ?? [],
  };

  return removeDeepProperty(mediaItem, '__typename');
};
