const deconstructImageFolderURL = url => {
  const [protocolDirty, , hostname, ...rest] = url.split('/');
  const protocol = protocolDirty.replace(/:/g, '');
  const pathname = `/${rest.join('/')}**`;
  return { protocol, hostname, pathname };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    APP_ENV: process.env.APP_ENV || 'development',
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    MENU_BAR_LOCATION: process.env.MENU_BAR_LOCATION,
    IMAGE_FOLDER_URL: process.env.IMAGE_FOLDER_URL,
  },
  images: {
    remotePatterns: [
      { ...deconstructImageFolderURL(process.env.IMAGE_FOLDER_URL), port: '' },
    ],
  },
};

module.exports = nextConfig;
