import { gql } from './__generated__';

export const QUERY_GALLERIES_BASIC = gql(`
  query queryGalleriesBasic {
    galleries {
      nodes {
        id
        slug
        status
      }
    }
  }
`);

export const QUERY_GALLERY_BY_SLUG = gql(`
  query queryGalleryBySlug($slug: ID!) {
    gallery(id: $slug, idType: SLUG) {
      id
      title
      slug
      status
      gallerySettings {
        galleryPhotos {
          databaseId
        }
      }
    }
  }
`);
