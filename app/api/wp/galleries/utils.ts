import { DeepOmit } from '@apollo/client/utilities';
import {
  QueryGalleriesBasicQuery,
  QueryGalleryBySlugQuery,
} from '@app/graphql/__generated__/graphql';

type QueryGallery = NonNullable<QueryGalleryBySlugQuery['gallery']>;

export type GalleryBasic = DeepOmit<
  NonNullable<QueryGalleriesBasicQuery['galleries']>['nodes'][number],
  '__typename'
>;

export type Gallery = DeepOmit<
  Omit<QueryGallery, 'gallerySettings'> & {
    photosId: string[];
  },
  '__typename'
>;

export const mapGallery = (gallery: QueryGallery): Gallery => {
  const { id, title, slug, status, gallerySettings } = gallery;

  return {
    id,
    title,
    slug,
    status,
    photosId:
      gallerySettings?.galleryPhotos?.map(photo =>
        photo?.databaseId ? photo?.databaseId.toString() : ''
      ) ?? [],
  };
};
