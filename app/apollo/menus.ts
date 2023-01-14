import { ApolloQueryResult } from "@apollo/client";
import { QUERY_ALL_MENUS } from "../graphQL/menus";
import { QueryAllMenus } from "../types/menus";
import { findMenuByLocation } from "../utils/menus";
import { getApolloClient } from "./apollo-client";

/**
 * getAllMenus
 */

export async function getAllMenus() {
  const apolloClient = getApolloClient();

  const { data, loading }: ApolloQueryResult<QueryAllMenus> =
    await apolloClient.query({
      query: QUERY_ALL_MENUS,
    });

  const menus = data?.menus.nodes;

  return {
    menus,
    loading,
  };
}

export const getMenuByLocation = async (location: string) => {
  const { menus, loading } = await getAllMenus();
  return { menu: findMenuByLocation(menus, location), loading };
};
