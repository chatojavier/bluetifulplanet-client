/* eslint-disable no-console */
import { QUERY_PAGES_BASIC } from '@app/graphql/pages';
import { ApiWpReturn } from '@app/api/api.types';
import fetchGraphql from '@app/utils/fetchGraphql';
import { PageBasic, mapPageBasicData } from '../utils';

const queryAllPagesBasic = async (): Promise<
  ApiWpReturn<{ pages: PageBasic[] }>
> => {
  let pagesData;

  try {
    pagesData = await fetchGraphql(QUERY_PAGES_BASIC);
  } catch (e) {
    console.log(
      `[pages][queryAllPagesBasic] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  const { data, errors } = pagesData;

  const pages = data?.pages?.nodes
    ? data.pages.nodes.map(mapPageBasicData)
    : [];

  return { data: { pages }, errors };
};

export default queryAllPagesBasic;
