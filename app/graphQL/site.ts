import { gql } from './__generated__';

export const QUERY_SITE_OPTIONS = gql(`
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
      websiteSettings {
        disableContextMenu {
          disabled
          messageToAlert
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
