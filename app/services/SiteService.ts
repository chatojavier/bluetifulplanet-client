import { ApiRoutes } from '@api/api.types';
import fetchData from '@utils/fetchData';
import { SocialMedia } from '@api/wp/options/utils';
import { SiteData } from '@api/wp/settings/utils';
import { isBrowser } from '@app/utils/general';
import querySiteData from '@app/api/wp/settings/service';
import querySiteOptions from '@app/api/wp/options/service';

const getSiteData = async () => {
  if (!isBrowser()) {
    const { data, errors } = await querySiteData();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<SiteData>(ApiRoutes.SETTINGS);
};

const getSiteOptions = async () => {
  if (!isBrowser()) {
    const { data, errors } = await querySiteOptions();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ socialMedia: SocialMedia }>(ApiRoutes.OPTIONS);
};

const SiteService = {
  getSiteData,
  getSiteOptions,
};

export default SiteService;
