/* eslint-disable no-console */
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_HOME_PAGE } from '@app/graphql/pages';
import { removeDeepProperty } from '@app/utils/general';
import { ApiWpReturn } from '@app/api/api.types';
import { HomePage } from '../utils';

const queryHomePage = async (): Promise<
  ApiWpReturn<{ page: HomePage | null }>
> => {
  const apolloClient = getApolloClient();

  let pageData;

  try {
    pageData = await apolloClient.query({
      query: QUERY_HOME_PAGE,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[pages][queryHomePage] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = pageData;

  const page = data.page ? removeDeepProperty(data.page, '__typename') : null;

  return { data: { page }, errors };
};

export default queryHomePage;
