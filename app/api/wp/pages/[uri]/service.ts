import { ApiWpReturn } from '@app/api/api.types';
import { QUERY_PAGE_BY_URI } from '@app/graphql/pages';
import fetchGraphql from '@app/utils/fetchGraphql';
import { Page, mapPageData } from '../utils';

const queryPageByUri = async (
  uri: string
): Promise<ApiWpReturn<{ page: Page | null }>> => {
  let pageData;

  try {
    pageData = await fetchGraphql(QUERY_PAGE_BY_URI, {
      uri,
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
