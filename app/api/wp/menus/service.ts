import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_ALL_MENUS } from '@app/graphql/menus';
import { Menu, mapMenu } from './utils';

const queryAllMenus = async (): Promise<ApiWpReturn<{ menus: Menu[] }>> => {
  const apolloClient = getApolloClient();

  const { data, errors } = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  });

  const menus = data?.menus?.nodes.map(mapMenu) ?? [];

  return { data: { menus }, errors };
};

export default queryAllMenus;
