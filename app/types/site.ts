import { QuerySiteOptionsQuery } from '@app/graphql/__generated__/graphql';
import { DeepOmit, Nullable } from './general';

export type SocialMedia = DeepOmit<
  NonNullable<QuerySiteOptionsQuery['optionsPage']>['socialMedia'],
  '__typename'
>;

export type SiteData = {
  title: Nullable<string>;
  siteTitle: Nullable<string>;
  description: Nullable<string>;
  language?: Nullable<string>;
  favicon?: {
    sourceUrl: Nullable<string>;
    width: Nullable<string>;
  }[];
};
