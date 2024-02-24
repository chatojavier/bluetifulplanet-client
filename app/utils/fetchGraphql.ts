import { ApiRoutes, ApiWpReturn } from '@app/api/api.types';
import { Exact, TypedDocumentString } from '@app/graphql/__generated__/graphql';
import { CustomInit } from './fetchData';

const host = process.env.WORDPRESS_HOST;
const endpoint = ApiRoutes.GRAPHQL;
const graphqlEndpoint = `${host}${endpoint}`;

const username = process.env.WP_REST_API_USER;
const password = process.env.WP_REST_API_PASS;
const authPair = `${username}:${password}`;

const fetchGraphql = async <T, P extends Record<string, unknown>>(
  query: TypedDocumentString<T, P>,
  variables?: Exact<P>,
  init?: Omit<CustomInit, 'method' | 'headers' | 'body'>
) => {
  const { tags, revalidate, ...rest } = init || {};

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${Buffer.from(authPair).toString('base64')}`,
    },
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
    ...(tags && { next: { tags } }),
    ...(revalidate && { next: { revalidate } }),
    ...rest,
  };

  return fetch(graphqlEndpoint, options)
    .then<ApiWpReturn<T>>(res => res.json())
    .catch(err => {
      throw err;
    });
};

export default fetchGraphql;
