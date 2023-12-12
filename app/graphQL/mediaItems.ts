import { gql } from './__generated__';

export const MEDIA_ITEM_FIELDS = gql(`
  fragment MediaItemFields on MediaItem {
    altText
    id
    sourceUrl
    mediaDetails {
      height
      width
    }
  }
`);

export const QUERY_MEDIA_ITEMS_BY_ID = gql(`
  query mediaItemsById($in: [ID]) {
    mediaItems(where: {in: $in}, first: 100) {
      nodes {
        ...MediaItemFields
        mediaDetails {
          meta {
            aperture
            focalLength
            iso
            shutterSpeed
          }
        }
        title
        description
        caption
      }
    }
  }
`);
