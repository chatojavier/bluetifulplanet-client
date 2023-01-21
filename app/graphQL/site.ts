import { gql } from "./__generated__";

export const QUERY_SITE_OPTIONS = gql(/* GraphQL */ `
  query querySiteOptions {
    optionsPage {
      socialMedia {
        socialMediaFacebook {
          show
          url
        }
        socialMediaInstagram {
          show
          url
        }
        socialMediaFlickr {
          show
          url
        }
        socialMediaBehance {
          show
          url
        }
      }
    }
  }
`);

export const QUERY_SITE_DATA = gql(`
  query querySiteData {
    generalSettings {
      description
      language
      title
    }
    favicon {
      mediaDetails {
        sizes {
          sourceUrl
          width
        }
      }
    }
  }
`);
