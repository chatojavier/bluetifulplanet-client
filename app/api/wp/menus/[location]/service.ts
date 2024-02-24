import { QUERY_MENU_BY_LOCATION } from '@app/graphql/menus';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import { ApiWpReturn } from '@api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Menu, mapMenu } from '../utils';

const queryMenuByLocation = async (
  location: MenuLocationEnum
): Promise<ApiWpReturn<{ menu: Menu | null }>> => {
  const { data, errors } = await fetchGraphql(QUERY_MENU_BY_LOCATION, {
    location,
  });

  const menu = data?.menus?.nodes.map(mapMenu)?.[0] ?? null;

  return { data: { menu }, errors };
};

export default queryMenuByLocation;
