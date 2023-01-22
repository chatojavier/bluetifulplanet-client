import { gql } from './__generated__';

export const QUERY_ALL_MENUS = gql(`
  query queryAllMenus {
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
`);
