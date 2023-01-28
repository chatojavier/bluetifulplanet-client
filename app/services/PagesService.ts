/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { cloneDeep } from '@apollo/client/utilities';
import { QUERY_HOME_PAGE } from '@app/graphql/pages';
import { removeDeepProperty } from '@app/utils/general';
import { getApolloClient } from './apollo-client';

export const getHomePage = async () => {
  const apolloClient = getApolloClient();

  let pageData;

  try {
    pageData = await apolloClient.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: QUERY_HOME_PAGE,
    });
  } catch (e) {
    console.log(
      `[pages][getHomePage] Failed to query page data: ${(e as Error).message}`
    );
    throw e;
  }

  if (pageData.data.nodeByUri && pageData.data.nodeByUri.__typename === 'Page')
    return {
      page: removeDeepProperty(
        cloneDeep(pageData.data.nodeByUri),
        '__typename'
      ),
    };

  return null;
};
