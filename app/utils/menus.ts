import { MenuItemsNode, MenuLink, MenuNode } from "../types/menus";

/**
 * findMenuByLocation
 */

export function findMenuByLocation(menus: MenuNode[], location: string | string[]) {
  let menu;

  if (!Array.isArray(location)) {
    location = [location];
  }
  const menuLocations = location.map((loc) => loc.toUpperCase());

  do {
    menu = menus.find(({ locations }) =>
      locations
        .map((loc) => loc.toUpperCase())
        .some((loc) => menuLocations.includes(loc))
    );
    menuLocations.pop();
  } while (!menu && menuLocations.length > 0);

  if (!menu) {
    return [];
  }

  return parseHierarchicalMenu(menu.menuItems.nodes);
}

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (data: MenuItemsNode[]) => {
  const hierarchicalMenu: MenuLink[] = [];

  if (data && data.length > 0) {
    data.forEach((item) => {
      const menuLink: MenuLink = {
        id: item.id,
        name: item.label,
        path: item.path,
        subMenu: null,
      };

      if (item.parentId) {
        const parentLink = hierarchicalMenu.find(
          (link) => link.id === item.parentId
        );
        if (parentLink)
          parentLink.subMenu = parentLink?.subMenu
            ? [...parentLink.subMenu, menuLink]
            : [menuLink];
      } else {
        hierarchicalMenu.push(menuLink);
      }
    });
  }

  return hierarchicalMenu;
};
