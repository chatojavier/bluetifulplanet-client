import {
  QUERY_GALLERIES_BASIC,
  QUERY_GALLERY_BY_SLUG,
} from '@app/graphql/galleries';
import { removeDeepProperty } from '@app/utils/general';
import { getApolloClient } from './apollo-client';

const getAllGalleriesBasic = async () => {
  const apolloClient = getApolloClient();

  let galleriesData;

  try {
    galleriesData = await apolloClient.query({
      query: QUERY_GALLERIES_BASIC,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[galleries][getAllGalleriesBasic] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  if (!galleriesData.data.galleries) return null;

  const galleries = galleriesData.data.galleries?.nodes.map(gallery =>
    removeDeepProperty(gallery, '__typename')
  );

  return { galleries };
};

const getGalleryBySlug = async (gallerySlug: string) => {
  const apolloClient = getApolloClient();

  let galleryData;

  try {
    galleryData = await apolloClient.query({
      query: QUERY_GALLERY_BY_SLUG,
      variables: {
        slug: gallerySlug,
      },
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[galleries][getGalleryBySlug] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  if (!galleryData.data.gallery) return null;

  const { id, title, slug, status, gallerySettings } =
    galleryData.data.gallery || {};

  const gallery = {
    id,
    title,
    slug,
    status,
    ...(gallerySettings?.galleryPhotos && {
      photosId: gallerySettings.galleryPhotos.map(photo =>
        photo?.databaseId ? photo?.databaseId.toString() : ''
      ),
    }),
  };

  return { gallery };
};

const GalleriesService = {
  getAllGalleriesBasic,
  getGalleryBySlug,
};

export default GalleriesService;
