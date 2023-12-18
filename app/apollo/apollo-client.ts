import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Endpoints } from '@app/types/general';
import { removeLastTrailingSlash } from '@utils/general';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const host = process.env.WORDPRESS_HOST;
const endpoint = Endpoints.GRAPHQL;
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

export const { getClient: getApolloClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
});
