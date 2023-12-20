/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { cloneDeep } from '@apollo/client/utilities';
import { getApolloClient } from '@app/apollo/apollo-client';
import { QUERY_HOME_PAGE } from '@app/graphql/pages';
import { removeDeepProperty } from '@app/utils/general';

const queryHomePage = async () => {
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

  const isPage = data.nodeByUri && data.nodeByUri.__typename === 'Page';
  const page = isPage
    ? removeDeepProperty(cloneDeep(data.nodeByUri), '__typename')
    : null;

  return { data: { page }, errors };
};

export default queryHomePage;
