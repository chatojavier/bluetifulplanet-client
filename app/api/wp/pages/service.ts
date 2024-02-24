import { QUERY_PAGES } from '@app/graphql/pages';
import fetchGraphql from '@app/utils/fetchGraphql';
import { mapPageData } from './utils';

const queryAllPages = async () => {
  let pagesData;

  try {
    pagesData = await fetchGraphql(QUERY_PAGES);
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

  const pages = data?.pages?.nodes ? data.pages.nodes.map(mapPageData) : [];

  return { data: { pages }, errors };
};

export default queryAllPages;
