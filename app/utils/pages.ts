import { QueryPagesQuery } from '@app/graphql/__generated__/graphql';
import { cloneDeep } from 'lodash';
import { removeDeepProperty } from './general';

export type Page = NonNullable<QueryPagesQuery['pages']>['nodes'][number];
export type PageMapped = Omit<
  Page,
  '__typename' | 'featuredImage' | 'template'
> & {
  featuredImage?: NonNullable<Page['featuredImage']>['node'];
  template?: string;
};

export const mapPageData = (page: Page): PageMapped => {
  const data = cloneDeep(page);
  const dataCleaned = removeDeepProperty(data, '__typename') as PageMapped;

  if (data.featuredImage) {
    dataCleaned.featuredImage = data.featuredImage.node;
  }

  if (data.template && data.template.templateName) {
    dataCleaned.template = data.template.templateName;
  }
  return dataCleaned;
};
