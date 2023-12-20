import { getApolloClient } from '@app/apollo/apollo-client';
import { QUERY_PAGES } from '@app/graphql/pages';
import { mapPageData } from '@app/utils/pages';

const queryAllPages = async () => {
  const apolloClient = getApolloClient();

  let pagesData;

  try {
    pagesData = await apolloClient.query({
      query: QUERY_PAGES,
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[pages][queryAllPages] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = pagesData;

  const pages = data.pages?.nodes ? data.pages.nodes.map(mapPageData) : [];

  return { data: { pages }, errors };
};

export default queryAllPages;
