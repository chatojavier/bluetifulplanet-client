import { MenuItemsNode, MenuLink, MenuNode } from 'types/menus';

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (data: MenuItemsNode[]) => {
  const hierarchicalMenu: MenuLink[] = [];

  if (data && data.length > 0) {
    data.forEach(item => {
      const menuLink: MenuLink = {
        id: item.id,
        name: item.label as string,
        path: item.path as string,
        subMenu: null,
      };

      if (item.parentId) {
        const parentLink = hierarchicalMenu.find(
          link => link.id === item.parentId
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

/**
 * findMenuByLocation
 */

export function findMenuByLocation(
  menus: MenuNode[],
  location: string | string[]
) {
  let menu;
  let locationUpdated = location;

  if (!Array.isArray(locationUpdated)) {
    locationUpdated = [locationUpdated];
  }
  const menuLocations = locationUpdated.map(loc => loc.toUpperCase());

  do {
    menu = menus.find(
      menuItem =>
        menuItem?.locations &&
        menuItem.locations
          .map(loc => loc && loc.toUpperCase())
          .some(loc => loc && menuLocations.includes(loc))
    );
    menuLocations.pop();
  } while (!menu && menuLocations.length > 0);

  if (!menu || !menu.menuItems) {
    return [];
  }

  return parseHierarchicalMenu(menu.menuItems.nodes);
}
