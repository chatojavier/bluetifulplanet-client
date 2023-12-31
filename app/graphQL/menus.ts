import { gql } from './__generated__';

export const MENU_FIELDS = gql(`
  fragment MenuFields on Menu {
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
`);

export const QUERY_ALL_MENUS = gql(`
  query queryAllMenus {
    menus {
      nodes {
        ...MenuFields
      }
    }
  }
`);

export const QUERY_MENU_BY_LOCATION = gql(`
  query queryMenuByLocation($location: MenuLocationEnum) {
    menus(where: { location: $location }) {
      nodes {
        ...MenuFields
      }
    }
  }
`);
