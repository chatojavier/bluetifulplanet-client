/* eslint-disable sonarjs/no-duplicate-string */
import { MenuItem } from '@app/api/wp/menus/utils';
import {
  MenuLocationEnum,
  QueryAllMenusQuery,
} from '@app/graphql/__generated__/graphql';

export const mockMenuNodes = [
  {
    id: 'cG9zdDoxNjg2',
    parentId: null,
    label: 'Home',
    path: '/',
  },
  {
    id: 'cG9zdDoxNjg3',
    parentId: null,
    label: 'Photos',
    path: '#',
  },
  {
    id: 'cG9zdDoxNjkz',
    parentId: 'cG9zdDoxNjg3',
    label: 'Main Gallery',
    path: '/galleries/main-gallery/',
  },
  {
    id: 'cG9zdDoxNjky',
    parentId: 'cG9zdDoxNjg3',
    label: 'Personal Favorites',
    path: '/galleries/personal-favorites/',
  },
  {
    id: 'cG9zdDoxNjkx',
    parentId: 'cG9zdDoxNjg3',
    label: 'Pollinators & Light',
    path: '/galleries/pollinators-light/',
  },
  {
    id: 'cG9zdDozNzM=',
    parentId: null,
    label: 'Blog',
    path: '/blog/',
  },
  {
    id: 'cG9zdDo0ODY=',
    parentId: null,
    label: 'About Me',
    path: '/about-me/',
  },
  {
    id: 'cG9zdDozODM=',
    parentId: null,
    label: 'Contact Me',
    path: '/contact-me/',
  },
];

export const mockMenuLinks: MenuItem[] = [
  {
    id: 'cG9zdDoxNjg2',
    label: 'Home',
    path: '/',
    subMenu: null,
  },
  {
    id: 'cG9zdDoxNjg3',
    label: 'Photos',
    path: '#',
    subMenu: [
      {
        id: 'cG9zdDoxNjkz',
        label: 'Main Gallery',
        path: '/galleries/main-gallery/',
        subMenu: null,
      },
      {
        id: 'cG9zdDoxNjky',
        label: 'Personal Favorites',
        path: '/galleries/personal-favorites/',
        subMenu: null,
      },
      {
        id: 'cG9zdDoxNjkx',
        label: 'Pollinators & Light',
        path: '/galleries/pollinators-light/',
        subMenu: null,
      },
    ],
  },
  {
    id: 'cG9zdDozNzM=',
    label: 'Blog',
    path: '/blog/',
    subMenu: null,
  },
  {
    id: 'cG9zdDo0ODY=',
    label: 'About Me',
    path: '/about-me/',
    subMenu: null,
  },
  {
    id: 'cG9zdDozODM=',
    label: 'Contact Me',
    path: '/contact-me/',
    subMenu: null,
  },
];

export const mockAllMenusNodes: NonNullable<
  QueryAllMenusQuery['menus']
>['nodes'] = [
  {
    id: 'dGVybTozNA==',
    menuItems: {
      nodes: [
        {
          id: 'cG9zdDoxNjg2',
          parentId: null,
          label: 'Home',
          path: '/',
        },
        {
          id: 'cG9zdDoxNjg3',
          parentId: null,
          label: 'Photos',
          path: '#',
        },
        {
          id: 'cG9zdDoxNjkz',
          parentId: 'cG9zdDoxNjg3',
          label: 'Main Gallery',
          path: '/galleries/main-gallery/',
        },
        {
          id: 'cG9zdDoxNjky',
          parentId: 'cG9zdDoxNjg3',
          label: 'Personal Favorites',
          path: '/galleries/personal-favorites/',
        },
        {
          id: 'cG9zdDoxNjkx',
          parentId: 'cG9zdDoxNjg3',
          label: 'Pollinators & Light',
          path: '/galleries/pollinators-light/',
        },
        {
          id: 'cG9zdDozNzM=',
          parentId: null,
          label: 'Blog',
          path: '/blog/',
        },
        {
          id: 'cG9zdDo0ODY=',
          parentId: null,
          label: 'About Me',
          path: '/about-me/',
        },
        {
          id: 'cG9zdDozODM=',
          parentId: null,
          label: 'Contact Me',
          path: '/contact-me/',
        },
      ],
    },
    name: 'navigation',
    slug: 'navigation',
    locations: [MenuLocationEnum.MainMenu],
  },
];
