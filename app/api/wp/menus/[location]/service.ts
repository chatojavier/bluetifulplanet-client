import { QUERY_MENU_BY_LOCATION } from '@app/graphql/menus';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import { getApolloClient } from '@app/utils/apollo-client';
import { ApiWpReturn } from '@api/api.types';
import { Menu, mapMenu } from '../utils';

const queryMenuByLocation = async (
  location: MenuLocationEnum
): Promise<ApiWpReturn<{ menu: Menu | null }>> => {
  const apolloClient = getApolloClient();

  const { data, errors } = await apolloClient.query({
    query: QUERY_MENU_BY_LOCATION,
    variables: {
      location,
    },
  });

  const menu = data?.menus?.nodes.map(mapMenu)?.[0] ?? null;

  return { data: { menu }, errors };
};

export default queryMenuByLocation;
