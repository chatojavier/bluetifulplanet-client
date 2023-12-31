import { Menu } from '@api/wp/menus/utils';
import fetchData from '@app/utils/fetchData';
import { ApiRoutes } from '@app/api/api.types';
import { isBrowser } from '@app/utils/general';
import queryAllMenus from '@app/api/wp/menus/service';
import queryMenuByLocation from '@app/api/wp/menus/[location]/service';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';

const getAllMenus = async () => {
  if (!isBrowser()) {
    const { data, errors } = await queryAllMenus();
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ menus: Menu[] }>(ApiRoutes.MENUS);
};

const getMenuByLocation = async (location: MenuLocationEnum) => {
  if (!isBrowser()) {
    const { data, errors } = await queryMenuByLocation(location);
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data;
  }

  return fetchData.get<{ menu: Menu | null }>(
    `${ApiRoutes.MENUS}?location=${location}`
  );
};

const MenusService = {
  getAllMenus,
  getMenuByLocation,
};

export default MenusService;
