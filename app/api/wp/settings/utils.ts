import { Nullable } from '@app/types/general';

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
