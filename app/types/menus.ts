import { QueryAllMenusQuery } from '@graphql/__generated__/graphql';

type AllMenus = NonNullable<QueryAllMenusQuery['menus']>;

export type MenuNode = AllMenus['nodes'][number];

type MenuItems = NonNullable<MenuNode['menuItems']>;

export type MenuItemsNode = MenuItems['nodes'][number];

export interface MenuLink {
  id: string;
  name: string;
  path: string;
  subMenu?: MenuLink[] | null;
}
