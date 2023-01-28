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
