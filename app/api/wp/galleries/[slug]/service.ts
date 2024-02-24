import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_GALLERY_BY_SLUG } from '@app/graphql/galleries';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Gallery, mapGallery } from '../utils';

/**
 * Queries a gallery by its slug.
 * @param gallerySlug - The slug of the gallery.
 * @returns A promise that resolves to an object containing the gallery data and any errors.
 */

const queryGalleryBySlug = async (
  gallerySlug: string
): Promise<ApiWpReturn<{ gallery: Gallery | null }>> => {
  let galleryData;

  try {
    galleryData = await fetchGraphql(QUERY_GALLERY_BY_SLUG, {
      slug: gallerySlug,
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
