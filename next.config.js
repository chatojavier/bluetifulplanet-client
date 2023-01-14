/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    APP_ENV: process.env.APP_ENV || "development",
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    MENU_BAR_LOCATION: process.env.MENU_BAR_LOCATION,
  },
};

module.exports = nextConfig;
