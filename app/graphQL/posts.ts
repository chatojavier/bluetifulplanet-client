import { gql } from './__generated__';

export const POST_FIELDS = gql(`
  fragment PostFields on Post {
    id
    databaseId
    title
    slug
    date
    status
    content
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
    author {
      node {
        name
      }
    }
    tags {
      nodes {
        uri
        name
      }
    }
    comments {
      nodes {
        ...CommentFields
      }
    }
    commentCount
  }
`);

export const QUERY_POSTS = gql(`
  query queryPosts {
    posts {
      nodes {
        ...PostFields
      }
    }
  }
`);

export const QUERY_POSTS_BASIC = gql(`query queryPostsBasic {
  posts {
    edges {
      cursor
      node {
        id
        slug
        status
        title
    	}
    }
  }
}`);

export const QUERY_POST_BY_URI = gql(`query queryPostByUri($uri: ID!) {
  post(id: $uri, idType: URI) {
    ...PostFields
  }
}`);

export const QUERY_PREV_NEXT_POST =
  gql(`query queryPrevNextPost($after: String, $before: String) {
  posts(first: 1, after: $after, before: $before) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    nodes {
      id
      title(format: RAW)
      slug
    }
  }
}`);
