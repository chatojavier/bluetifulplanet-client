import { QuerySiteOptionsQuery } from '@app/graphql/__generated__/graphql';
import { DeepOmit, TypeWithNull } from './general';

export type SocialMedia = DeepOmit<
  NonNullable<QuerySiteOptionsQuery['optionsPage']>['socialMedia'],
  '__typename'
>;

export type SiteData = {
  title: TypeWithNull<string>;
  siteTitle: TypeWithNull<string>;
  description: TypeWithNull<string>;
  language?: TypeWithNull<string>;
  favicon?: {
    sourceUrl: TypeWithNull<string>;
    width: TypeWithNull<string>;
  }[];
};
