import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { removeLastTrailingSlash } from '@utils/general';
import { ApiRoutes } from '@app/api/api.types';

let client: ApolloClient<NormalizedCacheObject>;

const host = process.env.WORDPRESS_HOST;
const endpoint = ApiRoutes.GRAPHQL;
const httpLink = createHttpLink({
  uri: removeLastTrailingSlash(host + endpoint),
});

const authLink = setContext((_, { headers }) => {
  const username = process.env.WP_REST_API_USER;
  const password = process.env.WP_REST_API_PASS;
  const authPair = `${username}:${password}`;
  return {
    headers: {
      ...headers,
      authorization: `Basic ${Buffer.from(authPair).toString('base64')}`,
    },
  };
});

/**
 * createApolloClient
 */

export const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const getApolloClient = () => {
  if (!client) {
    client = createApolloClient();
  }
  return client;
};
