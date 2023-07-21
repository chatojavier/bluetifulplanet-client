import { gql } from './__generated__';

export const QUERY_HOME_PAGE = gql(`query queryHomePage {
  nodeByUri(uri: "/") {
    ... on Page {
      id
      title
      slider {
        sliderDesktop {
          id
          sourceUrl
          mediaDetails {
            height
            width
          }
          altText
        }
        sliderMobile {
          id
          sourceUrl
          mediaDetails {
            height
            width
          }
          altText
        }
      }
    }
  }
}`);

export const QUERY_PAGES = gql(`query queryPages {
  pages {
    nodes {
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
          altText
          id
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
}`);

export const QUERY_PAGE_BY_URI = gql(`query queryPageByUri($uri: ID!) {
  page(id: $uri, idType: URI) {
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
          altText
          id
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
}`);
