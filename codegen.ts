import { ApiRoutes } from '@app/api/api.types';
import { CodegenConfig } from '@graphql-codegen/cli';

const host = process.env.WORDPRESS_HOST;
const endpoint = ApiRoutes.GRAPHQL;

const config: CodegenConfig = {
  schema: `${host}${endpoint}`,
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
