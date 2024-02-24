import { DeepOmit } from '@app/types/general';
import {
  QueryHomePageQuery,
  PageFieldsFragment as QueryPage,
  QueryPagesBasicQuery,
} from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from '@utils/general';

type QueryHomePage = NonNullable<QueryHomePageQuery['page']>;

type QueryPageBasic = NonNullable<
  QueryPagesBasicQuery['pages']
>['nodes'][number];

export type HomePage = DeepOmit<QueryHomePage, '__typename'>;

export type Page = DeepOmit<
  Omit<QueryPage, 'featuredImage' | 'template'> & {
    featuredImage: NonNullable<QueryPage['featuredImage']>['node'] | null;
    template: NonNullable<QueryPage['template']>['templateName'] | null;
  },
  '__typename'
>;

export type PageBasic = DeepOmit<
  Omit<QueryPageBasic, 'template'> & {
    template: NonNullable<QueryPageBasic['template']>['templateName'] | null;
  },
  '__typename'
>;

export const mapPageData = (page: QueryPage): Page => {
  const data = {
    ...page,
    featuredImage: page.featuredImage ? page.featuredImage.node : null,
    template: page.template ? page.template.templateName : null,
  };
  return removeDeepProperty(data, '__typename');
};

export const mapPageBasicData = (page: QueryPageBasic): PageBasic => {
  const pageUpdated = {
    ...page,
    template: page.template?.templateName,
  };
  return removeDeepProperty(pageUpdated, '__typename');
};
