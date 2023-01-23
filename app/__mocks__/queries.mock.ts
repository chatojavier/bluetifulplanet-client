export const mockOptionsPageQuery = {
  optionsPage: {
    __typename: 'OptionsPage',
    socialMedia: {
      __typename: 'OptionsPage_Socialmedia',
      socialMediaFacebook: {
        __typename: 'OptionsPage_Socialmedia_SocialMediaFacebook',
        show: true,
        url: 'https://facebook.com/BluetifulPlanet',
      },
      socialMediaInstagram: {
        __typename: 'OptionsPage_Socialmedia_SocialMediaInstagram',
        show: true,
        url: 'https://instagram.com/bluetifulplanet',
      },
      socialMediaFlickr: {
        __typename: 'OptionsPage_Socialmedia_SocialMediaFlickr',
        show: null,
        url: null,
      },
      socialMediaBehance: {
        __typename: 'OptionsPage_Socialmedia_SocialMediaBehance',
        show: null,
        url: null,
      },
    },
  },
};

export const mockOptionsPageResult = {
  optionsPage: {
    socialMedia: {
      socialMediaFacebook: {
        show: true,
        url: 'https://facebook.com/BluetifulPlanet',
      },
      socialMediaInstagram: {
        show: true,
        url: 'https://instagram.com/bluetifulplanet',
      },
      socialMediaFlickr: {
        show: null,
        url: null,
      },
      socialMediaBehance: {
        show: null,
        url: null,
      },
    },
  },
};

export const mockMenuQuery = {
  menus: {
    __typename: 'RootQueryToMenuConnection',
    nodes: [
      {
        __typename: 'Menu',
        id: 'dGVybTozNA==',
        menuItems: {
          __typename: 'MenuToMenuItemConnection',
          nodes: [
            {
              __typename: 'MenuItem',
              id: 'cG9zdDoxNjg2',
              parentId: null,
              label: 'Home',
              path: '/',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDoxNjg3',
              parentId: null,
              label: 'Photos',
              path: '#',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDoxNjkz',
              parentId: 'cG9zdDoxNjg3',
              label: 'Main Gallery',
              path: '/galleries/main-gallery/',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDoxNjky',
              parentId: 'cG9zdDoxNjg3',
              label: 'Personal Favorites',
              path: '/galleries/personal-favorites/',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDoxNjkx',
              parentId: 'cG9zdDoxNjg3',
              label: 'Pollinators & Light',
              path: '/galleries/pollinators-light/',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDozNzM=',
              parentId: null,
              label: 'Blog',
              path: '/blog/',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDo0ODY=',
              parentId: null,
              label: 'About Me',
              path: '/about-me/',
            },
            {
              __typename: 'MenuItem',
              id: 'cG9zdDozODM=',
              parentId: null,
              label: 'Contact Me',
              path: '/contact-me/',
            },
          ],
        },
        name: 'navigation',
        slug: 'navigation',
        locations: ['MAIN_MENU'],
      },
    ],
  },
};

export const mockMenuResult = {
  menus: {
    nodes: [
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
        locations: ['MAIN_MENU'],
      },
    ],
  },
};
