import fetchData from '@app/utils/fetchData';
import { ApiRoutes } from '@app/api/api.types';
import { HomePage, Page, PageBasic } from '@api/wp/pages/utils';
import { isBrowser } from '@app/utils/general';
import queryHomePage from '@app/api/wp/pages/home/service';
import queryAllPages from '@app/api/wp/pages/service';
import queryAllPagesBasic from '@app/api/wp/pages/basic/service';
import queryPageByUri from '@app/api/wp/pages/[uri]/service';

const getHomePage = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryHomePage();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ page: HomePage | null }>(ApiRoutes.HOMEPAGE);
};

const getAllPages = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllPages();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ pages: Page[] }>(ApiRoutes.PAGES);
};

const getAllPagesBasic = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllPagesBasic();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }
  return fetchData.get<{ pages: PageBasic[] }>(ApiRoutes.PAGES_BASIC);
};

const getPageByUri = async (uri: string) => {
  if (!isBrowser()) {
    const { data, errors } = await queryPageByUri(uri);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }
  return fetchData.get<{ page: Page | null }>(`${ApiRoutes.PAGES}/${uri}`);
};

const PagesService = {
  getHomePage,
  getAllPages,
  getAllPagesBasic,
  getPageByUri,
};

export default PagesService;
