import { gql } from './__generated__';

export const PAGE_FIELDS = gql(`
  fragment PageFields on Page {
    id
    title
    uri
    template {
      templateName
    }
    status
    content
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
  }
`);

export const QUERY_HOME_PAGE = gql(`query queryHomePage {
  nodeByUri(uri: "/") {
    ... on Page {
      id
      title
      slider {
        sliderDesktop {
          ...MediaItemFields
        }
        sliderMobile {
          ...MediaItemFields
        }
      }
    }
  }
}`);

export const QUERY_PAGES = gql(`query queryPages {
  pages {
    nodes {
      ...PageFields
    }
  }
}`);

export const QUERY_PAGES_BASIC = gql(`query queryPagesBasic {
  pages {
    nodes {
      id
      slug
      template {
        templateName
      }
      status
    }
  }
}`);

export const QUERY_PAGE_BY_URI = gql(`query queryPageByUri($uri: ID!) {
  page(id: $uri, idType: URI) {
      ...PageFields
    }
}`);
