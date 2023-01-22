import { QUERY_SITE_DATA } from '@graphql/site';
import { getApolloClient } from './apollo-client';

type TypeWithNull<T> = T | null | undefined;

export type SiteData = {
  title: TypeWithNull<string>;
  siteTitle: TypeWithNull<string>;
  description: TypeWithNull<string>;
  language?: TypeWithNull<string>;
  favicon?: {
    sourceUrl: TypeWithNull<string>;
    width: TypeWithNull<string>;
  }[];
};

async function getSiteData() {
  const apolloClient = getApolloClient();

  let siteData;

  try {
    siteData = await apolloClient.query({
      query: QUERY_SITE_DATA,
    });
  } catch (error) {
    const errorMessage = `[site][getSiteData] Failed to query site data: ${
      (error as Error).message
    }`;
    // eslint-disable-next-line no-console
    console.log(errorMessage);

    throw error;
  }

  const { generalSettings, favicon } = siteData?.data || {};

  const settings: SiteData = {
    title: generalSettings?.title,
    siteTitle: generalSettings?.title,
    description: generalSettings?.description,
  };

  // It looks like the value of `language` when US English is set
  // in WordPress is empty or "", meaning, we have to infer that
  // if there's no value, it's English. On the other hand, if there
  // is a code, we need to grab the 2char version of it to use ofr
  // the HTML lang attribute

  if (!generalSettings?.language || generalSettings.language === '') {
    settings.language = 'en';
  } else {
    settings.language = generalSettings.language.split('_')[0];
  }

  if (favicon?.mediaDetails?.sizes && favicon.mediaDetails.sizes.length > 0) {
    settings.favicon = favicon.mediaDetails.sizes.map(favItem => ({
      sourceUrl: favItem?.sourceUrl,
      width: favItem?.width,
    }));
  }

  return settings;
}

const SiteService = {
  getSiteData,
};

export default SiteService;
