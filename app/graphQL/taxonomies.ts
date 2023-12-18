import { gql } from './__generated__';

export const MEDIA_TAG_FIELDS = gql(`
  fragment MediaTagFields on MediaTag {
    id
    name
    slug
  }
`);
