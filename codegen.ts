import { CodegenConfig } from '@graphql-codegen/cli';
import { ApiRoutes } from './app/api/api.types';

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
