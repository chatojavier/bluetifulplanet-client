import { CodegenConfig } from '@graphql-codegen/cli';
import { ApiRoutes } from './app/api/api.types';

const host = process.env.WORDPRESS_HOST;
const endpoint = ApiRoutes.GRAPHQL;
const username = process.env.WP_REST_API_USER;
const password = process.env.WP_REST_API_PASS;
const authPair = `${username}:${password}`;

const config: CodegenConfig = {
  schema: [
    {
      [`${host}${endpoint}`]: {
        headers: {
          Authorization: `Basic ${Buffer.from(authPair).toString('base64')}`,
        },
      },
    },
  ],
  documents: ['app/graphql/*.ts'],
  generates: {
    './app/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      config: {
        documentMode: 'string',
      },
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
};

export default config;
