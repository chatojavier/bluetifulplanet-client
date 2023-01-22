import { QUERY_ALL_MENUS } from '@graphql/menus';
import { findMenuByLocation } from '@utils/menus';
import { getApolloClient } from './apollo-client';

/**
 * getAllMenus
 */

async function getAllMenus() {
  const apolloClient = getApolloClient();

  const { data, loading } = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  });

  const menus = data?.menus?.nodes ?? [];

  return {
    menus,
    loading,
  };
}

const getMenuByLocation = async (location: string) => {
  const { menus, loading } = await getAllMenus();
  return { menu: findMenuByLocation(menus, location), loading };
};

const MenusService = {
  getAllMenus,
  getMenuByLocation,
};

export default MenusService;
