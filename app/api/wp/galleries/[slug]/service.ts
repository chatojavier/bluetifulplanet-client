import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_GALLERY_BY_SLUG } from '@app/graphql/galleries';
import { Gallery, mapGallery } from '../utils';

/**
 * Queries a gallery by its slug.
 * @param gallerySlug - The slug of the gallery.
 * @returns A promise that resolves to an object containing the gallery data and any errors.
 */

const queryGalleryBySlug = async (
  gallerySlug: string
): Promise<ApiWpReturn<{ gallery: Gallery | null }>> => {
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
    // eslint-disable-next-line no-console
    console.log(
      `[galleries][queryGalleryBySlug] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = galleryData;

  const gallery = data.gallery ? mapGallery(data.gallery) : null;

  return { data: { gallery }, errors };
};

export default queryGalleryBySlug;
