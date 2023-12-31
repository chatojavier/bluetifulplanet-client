import { ApiWpReturn } from '@app/api/api.types';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_PAGE_BY_URI } from '@app/graphql/pages';
import { Page, mapPageData } from '../utils';

const queryPageByUri = async (
  uri: string
): Promise<ApiWpReturn<{ page: Page | null }>> => {
  const apolloClient = getApolloClient();

  let pageData;

  try {
    pageData = await apolloClient.query({
      query: QUERY_PAGE_BY_URI,
      variables: {
        uri,
      },
      fetchPolicy: 'no-cache',
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[pages][queryPageByUri] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = pageData;

  const page = data?.page ? mapPageData(data.page) : null;

  return { data: { page }, errors };
};

export default queryPageByUri;
