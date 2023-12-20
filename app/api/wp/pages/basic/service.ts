/* eslint-disable no-console */
import { getApolloClient } from '@app/apollo/apollo-client';
import { QUERY_PAGES_BASIC } from '@app/graphql/pages';
import { removeDeepProperty } from '@app/utils/general';

const queryAllPagesBasic = async () => {
  const apolloClient = getApolloClient();

  let pagesData;

  try {
    pagesData = await apolloClient.query({
      query: QUERY_PAGES_BASIC,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    console.log(
      `[pages][queryAllPages] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = pagesData;

  const pages = data.pages?.nodes
    ? data.pages.nodes.map(page => {
        const { id, slug, template, status } = page;

        const pageUpdated = {
          id,
          slug,
          template: template?.templateName,
          status,
        };
        return removeDeepProperty(pageUpdated, '__typename');
      })
    : [];

  return { data: { pages }, errors };
};

export default queryAllPagesBasic;
