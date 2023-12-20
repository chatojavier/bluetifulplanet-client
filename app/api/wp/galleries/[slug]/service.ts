import { getApolloClient } from '@app/apollo/apollo-client';
import { QUERY_GALLERY_BY_SLUG } from '@app/graphql/galleries';

const queryGalleryBySlug = async (gallerySlug: string) => {
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

  const { id, title, slug, status, gallerySettings } = data.gallery || {};

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

  return { data: { gallery }, errors };
};

export default queryGalleryBySlug;
