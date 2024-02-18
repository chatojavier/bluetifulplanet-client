/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV || 'dev',
    WORDPRESS_HOST: process.env.WORDPRESS_HOST,
    MENU_BAR_LOCATION: process.env.MENU_BAR_LOCATION,
    IMAGE_FOLDER_URL: process.env.IMAGE_FOLDER_URL,
    IMAGE_AVATAR_URL: process.env.IMAGE_AVATAR_URL,
  },
  images: {
    domains: [
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      '3.gravatar.com',
      'secure.gravatar.com',
      process.env.HOSTNAME,
    ],
  },
};

module.exports = nextConfig;
