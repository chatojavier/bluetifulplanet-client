import { gql } from './__generated__';

export const PREV_NEXT_POST = gql(`
  fragment PrevNextPost on Post {
    id
    title
    slug
  }
`);

export const POST_BASIC = gql(`
  fragment PostBasic on Post {
    id
    databaseId
    title
    slug
    date
    status
  }
`);

export const POST_FIELDS = gql(`
  fragment PostFields on Post {
    ...PostBasic
    content
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
    author {
      node {
        ...UserBasic
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
    next {
      ...PrevNextPost
    }
    previous {
      ...PrevNextPost
    }
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
  posts(first: 100) {
    nodes {
      ...PostBasic
    }
  }
}`);

export const QUERY_POSTS_RESUME = gql(`
  query queryPostsResumes($offsetPagination: OffsetPagination) {
    posts(where: {offsetPagination: $offsetPagination}) {
      nodes {
        ...PostBasic
        excerpt
        featuredImage {
          node {
            ...MediaItemFields
          }
        }
        author {
          node {
            ...UserBasic
          }
        }
      }
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
    }
  }
`);

export const QUERY_POST_BY_URI = gql(`query queryPostByUri($uri: ID!) {
  post(id: $uri, idType: URI) {
    ...PostFields
  }
}`);
