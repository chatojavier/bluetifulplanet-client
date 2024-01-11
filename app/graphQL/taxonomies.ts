import { gql } from './__generated__';

export const MEDIA_TAG_FIELDS = gql(`
  fragment MediaTagFields on MediaTag {
    id
    name
    slug
  }
`);

export const QUERY_ALL_MEDIA_TAGS = gql(`
  query queryAllMediaTags {
    mediaTags(first: 1000) {
      nodes {
        ...MediaTagFields
      }
    }
  }
`);

export const QUERY_MEDIA_TAG_BY_SLUG = gql(`
  query QueryMediaTagBySlug($slug: ID!) {
    mediaTag(id: $slug, idType: SLUG) {
      id
      name
      slug
      mediaItems(first: 1000) {
        nodes {
          databaseId
        }
      }
    }
  }
`);
