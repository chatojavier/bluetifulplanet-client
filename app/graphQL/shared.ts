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
