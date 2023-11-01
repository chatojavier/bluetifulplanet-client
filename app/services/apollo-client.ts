import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Endpoints } from '@app/types/general';
import { removeLastTrailingSlash } from '@utils/general';

let client: ApolloClient<NormalizedCacheObject>;

const host = process.env.WORDPRESS_HOST;
const endpoint = Endpoints.GRAPHQL;
const httpLink = createHttpLink({
  uri: removeLastTrailingSlash(host + endpoint),
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
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

// eslint-disable-next-line no-underscore-dangle
export const _createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
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
