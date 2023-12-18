/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { cloneDeep } from '@apollo/client/utilities';
import {
  QUERY_HOME_PAGE,
  QUERY_PAGES,
  QUERY_PAGES_BASIC,
  QUERY_PAGE_BY_URI,
} from '@app/graphql/pages';
import { removeDeepProperty } from '@app/utils/general';
import { mapPageData } from '@app/utils/pages';
import { getApolloClient } from './apollo-client';

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

  if (pageData.data.nodeByUri && pageData.data.nodeByUri.__typename === 'Page')
    return {
      page: removeDeepProperty(
        cloneDeep(pageData.data.nodeByUri),
        '__typename'
      ),
    };

  return null;
};

const queryAllPages = async () => {
  const apolloClient = getApolloClient();

  let pagesData;

  try {
    pagesData = await apolloClient.query({
      query: QUERY_PAGES,
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

  if (!pagesData.data.pages) return null;

  const pages = pagesData.data.pages?.nodes.map(mapPageData);

  return { pages };
};

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

  if (!pagesData.data.pages) return null;

  const pages = pagesData.data.pages?.nodes.map(page => {
    const { id, slug, template, status } = page;

    const pageUpdated = {
      id,
      slug,
      template: template?.templateName,
      status,
    };
    return removeDeepProperty(pageUpdated, '__typename');
  });

  return { pages };
};

const queryPageByUri = async (uri: string) => {
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
    console.log(
      `[pages][queryPageByUri] Failed to query page data: ${
        (e as Error).message
      }`
    );
    throw e;
  }

  if (!pageData.data.page) return null;

  const [page] = [pageData.data.page].map(mapPageData);

  return { page };
};

const PagesService = {
  queryHomePage,
  queryAllPages,
  queryAllPagesBasic,
  queryPageByUri,
};

export default PagesService;
