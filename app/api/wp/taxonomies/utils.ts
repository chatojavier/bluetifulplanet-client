import { DeepOmit } from '@app/types/general';
import { QueryMediaTagBySlugQuery } from '@app/graphql/__generated__/graphql';

type QueryMediaTag = NonNullable<QueryMediaTagBySlugQuery['mediaTag']>;

export type MediaTag = DeepOmit<
  Omit<QueryMediaTag, 'mediaItems'> & {
    photosId: string[];
  },
  '__typename'
>;

export const mapMediaTag = (mediaTag: QueryMediaTag): MediaTag => {
  const { id, name, slug, mediaItems } = mediaTag;

  return {
    id,
    name,
    slug,
    photosId:
      mediaItems?.nodes?.map(photo =>
        photo?.databaseId ? photo?.databaseId.toString() : ''
      ) ?? [],
  };
};
