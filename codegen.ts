import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';
import { ApiRoutes } from './app/api/api.types';

loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

const host = process.env.WORDPRESS_HOST;
const endpoint = ApiRoutes.GRAPHQL;

const config: CodegenConfig = {
  schema: [
    {
      [`${host}${endpoint}`]: {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.WP_REST_API_USER}:${process.env.WP_REST_API_PASS}`
          ).toString('base64')}`,
        },
      },
    },
  ],
  documents: ['app/graphql/*.ts'],
  generates: {
    './app/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
  overwrite: true,
};

export default config;
