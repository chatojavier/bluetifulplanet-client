import { gql } from "@apollo/client";

export const QUERY_ALL_MENUS = gql`
{
  menus {
    nodes {
      id
      menuItems {
        nodes {
          id
          parentId
          label
          path
        }
      }
      name
      slug
      locations
    }
  }
}
`;
