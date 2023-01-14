export interface QueryAllMenus {
  menus: {
    nodes: MenuNode[];
  };
}

export interface MenuNode {
  id: string;
  menuItems: {
    nodes: MenuItemsNode[];
  };
  name: string;
  slug: string;
  locations: string[];
}

export interface MenuItemsNode {
  id: string;
  parentId: string | null;
  label: string;
  path: string;
}

export interface MenuLink {
  id: string;
  name: string;
  path: string;
  subMenu?: MenuLink[] | null;
}