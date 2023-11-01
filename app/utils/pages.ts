import { PageFieldsFragment } from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from './general';

export type Page = PageFieldsFragment;

export const mapPageData = (page: Page) => {
  const data = {
    ...page,
    featuredImage: page.featuredImage ? page.featuredImage.node : null,
    template: page.template ? page.template.templateName : null,
  };
  return removeDeepProperty(data, '__typename');
};

export type PageMapped = ReturnType<typeof mapPageData>;
