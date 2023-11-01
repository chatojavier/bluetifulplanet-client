import { CodegenConfig } from '@graphql-codegen/cli';
import { Endpoints } from './app/types/general';

const host = process.env.WORDPRESS_HOST;
const endpoint = Endpoints.GRAPHQL;

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
