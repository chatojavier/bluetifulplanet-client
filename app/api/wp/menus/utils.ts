import { DeepOmit } from '@app/types/general';
import { MenuFieldsFragment } from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from '@utils/general';

type QueryMenuItem = NonNullable<
  MenuFieldsFragment['menuItems']
>['nodes'][number];

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  subMenu?: MenuItem[] | null;
}

export type Menu = DeepOmit<
  Omit<NonNullable<MenuFieldsFragment>, 'menuItems'> & {
    menuItems: MenuItem[];
  },
  '__typename'
>;

const parseHierarchicalMenu = (items: QueryMenuItem[]) => {
  const hierarchicalMenu: MenuItem[] = [];

  if (items && items.length > 0) {
    items.forEach(item => {
      const menuItem: MenuItem = {
        id: item.id,
        label: item.label as string,
        path: item.path as string,
        subMenu: null,
      };

      if (item.parentId) {
        const parentLink = hierarchicalMenu.find(
          link => link.id === item.parentId
        );
        if (parentLink)
          parentLink.subMenu = parentLink?.subMenu
            ? [...parentLink.subMenu, menuItem]
            : [menuItem];
      } else {
        hierarchicalMenu.push(menuItem);
      }
    });
  }

  return hierarchicalMenu;
};

export const mapMenu = (queryMenu: MenuFieldsFragment): Menu => {
  const menu = {
    ...queryMenu,
    menuItems: queryMenu.menuItems?.nodes
      ? parseHierarchicalMenu(queryMenu.menuItems?.nodes)
      : [],
  };

  return removeDeepProperty(menu, '__typename');
};
