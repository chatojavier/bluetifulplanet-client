import { QUERY_ALL_MENUS } from '@graphql/menus';
import { findMenuByLocation } from '@utils/menus';
import { getApolloClient } from './apollo-client';

/**
 * queryAllMenus
 */

async function queryAllMenus() {
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

const queryMenuByLocation = async (location: string) => {
  const { menus, loading } = await queryAllMenus();
  return { menu: findMenuByLocation(menus, location), loading };
};

const MenusService = {
  queryAllMenus,
  queryMenuByLocation,
};

export default MenusService;
