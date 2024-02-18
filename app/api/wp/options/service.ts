import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_SITE_OPTIONS } from '@app/graphql/site';
import { removeDeepProperty } from '@utils/general';
import { cloneDeep } from '@apollo/client/utilities';
import { DisableContextMenu, SocialMedia } from './utils';

const querySiteOptions = async (): Promise<
  ApiWpReturn<{
    socialMedia: SocialMedia;
    disableContextMenu: DisableContextMenu;
  }>
> => {
  const apolloClient = getApolloClient();

  let siteOptions;

  try {
    siteOptions = await apolloClient.query({
      query: QUERY_SITE_OPTIONS,
    });
  } catch (error) {
    const errorMessage = `[site][querySiteOptions] Failed to query site data: ${
      (error as Error).message
    }`;
    // eslint-disable-next-line no-console
    console.log(errorMessage);

    throw error;
  }

  const { data, errors } = siteOptions;

  const { socialMedia: wpSocialMedia, websiteSettings } =
    data?.optionsPage || {};

  const socialMedia = removeDeepProperty(
    cloneDeep(wpSocialMedia),
    '__typename'
  );

  const { disableContextMenu: wpDisableContextMenu } = websiteSettings || {};

  const disableContextMenu = removeDeepProperty(
    cloneDeep(wpDisableContextMenu),
    '__typename'
  );

  return { data: { socialMedia, disableContextMenu }, errors };
};

export default querySiteOptions;
