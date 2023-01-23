import { cloneDeep } from '@apollo/client/utilities';
import { SiteData } from '@app/types/site';
import { QUERY_SITE_DATA, QUERY_SITE_OPTIONS } from '@graphql/site';
import { removeDeepProperty } from '@utils/general';
import { uniqBy } from 'lodash';
import { getApolloClient } from './apollo-client';

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
    const faviconSizes = uniqBy([...favicon.mediaDetails.sizes], 'sourceUrl');
    settings.favicon = faviconSizes.map(favItem => ({
      sourceUrl: favItem?.sourceUrl,
      width: favItem?.width,
    }));
  }

  return settings;
}

const getSiteOptions = async () => {
  const apolloClient = getApolloClient();

  let siteOptions;

  try {
    siteOptions = await apolloClient.query({
      query: QUERY_SITE_OPTIONS,
    });
  } catch (error) {
    const errorMessage = `[site][getSiteOptions] Failed to query site data: ${
      (error as Error).message
    }`;
    // eslint-disable-next-line no-console
    console.log(errorMessage);

    throw error;
  }

  const { socialMedia } = siteOptions?.data?.optionsPage || {};

  return removeDeepProperty(cloneDeep(socialMedia), '__typename');
};

const SiteService = {
  getSiteData,
  getSiteOptions,
};

export default SiteService;
