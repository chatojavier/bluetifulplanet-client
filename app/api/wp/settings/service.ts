import { getApolloClient } from '@app/apollo/apollo-client';
import { SiteData } from '@app/types/site';
import { QUERY_SITE_DATA } from '@graphql/site';
import { uniqBy } from 'lodash';

async function querySiteData() {
  const apolloClient = getApolloClient();

  let siteData;

  try {
    siteData = await apolloClient.query({
      query: QUERY_SITE_DATA,
    });
  } catch (error) {
    const errorMessage = `[site][querySiteData] Failed to query site data: ${
      (error as Error).message
    }`;
    // eslint-disable-next-line no-console
    console.error(errorMessage);

    throw error;
  }

  const { data, errors } = siteData;

  const { generalSettings, favicon } = data || {};

  const settings: SiteData = {
    title: generalSettings?.title,
    siteTitle: generalSettings?.title,
    description: generalSettings?.description,
  };

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

  return { data: settings, errors };
}

export default querySiteData;
