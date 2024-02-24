import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_ALL_MENUS } from '@app/graphql/menus';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Menu, mapMenu } from './utils';

const queryAllMenus = async (): Promise<ApiWpReturn<{ menus: Menu[] }>> => {
  const { data, errors } = await fetchGraphql(QUERY_ALL_MENUS);

  const menus = data?.menus?.nodes.map(mapMenu) ?? [];

  return { data: { menus }, errors };
};

export default queryAllMenus;
