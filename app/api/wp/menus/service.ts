import { getApolloClient } from '@app/apollo/apollo-client';
import { QUERY_ALL_MENUS } from '@graphql/menus';

const queryAllMenus = async () => {
  const apolloClient = getApolloClient();

  const { data, errors } = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  });

  const menus = data?.menus?.nodes ?? [];

  return { data: { menus }, errors };
};

export default queryAllMenus;
