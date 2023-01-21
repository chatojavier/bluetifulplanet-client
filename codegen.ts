import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
  documents: ["app/graphql/*.ts"],
  generates: {
    "./app/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  overwrite: true,
};

export default config;
