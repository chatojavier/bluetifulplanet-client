import { DeepOmit, PartialExcept } from '@app/types/general';
import {
  QueryGalleriesBasicQuery,
  QueryGalleryBySlugQuery,
} from '@app/graphql/__generated__/graphql';
import { Comment, mapCommentData } from '../comments/utils';

type QueryGallery = NonNullable<QueryGalleryBySlugQuery['gallery']>;

export type GalleryBasic = DeepOmit<
  NonNullable<QueryGalleriesBasicQuery['galleries']>['nodes'][number],
  '__typename'
>;

export type Gallery = PartialExcept<
  DeepOmit<
    Omit<QueryGallery, 'gallerySettings' | 'comments'> & {
      photosId: string[];
      comments: Comment[];
    },
    '__typename'
  >,
  'id' | 'databaseId'
>;

export const mapGallery = (gallery: QueryGallery): Gallery => {
  const { __typename, gallerySettings, comments, ...rest } = gallery;

  return {
    ...rest,
    photosId:
      gallerySettings?.galleryPhotos?.map(photo =>
        photo?.databaseId ? photo?.databaseId.toString() : ''
      ) ?? [],
    comments: comments?.nodes.map(mapCommentData) ?? [],
  };
};
