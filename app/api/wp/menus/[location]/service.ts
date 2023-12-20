import { QUERY_MENU_BY_LOCATION } from '@graphql/menus';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import { getApolloClient } from '@app/apollo/apollo-client';

const queryMenuByLocation = async (location: MenuLocationEnum) => {
  const apolloClient = getApolloClient();

  const { data, errors } = await apolloClient.query({
    query: QUERY_MENU_BY_LOCATION,
    variables: {
      location,
    },
  });

  const menus = data?.menus?.nodes ?? [];

  return { data: { menus }, errors };
};

export default queryMenuByLocation;
