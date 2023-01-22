import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { removeLastTrailingSlash } from '@utils/general';

let client: ApolloClient<NormalizedCacheObject>;

/**
 * createApolloClient
 */

// eslint-disable-next-line no-underscore-dangle
export const _createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(
        process.env.WORDPRESS_GRAPHQL_ENDPOINT as string
      ),
    }),
    cache: new InMemoryCache(),
  });
};

/**
 * getApolloClient
 */

export const getApolloClient = () => {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
};
