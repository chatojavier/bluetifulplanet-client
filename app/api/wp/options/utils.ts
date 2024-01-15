import { DeepOmit } from '@apollo/client/utilities/types/DeepOmit';
import { QuerySiteOptionsQuery } from '@app/graphql/__generated__/graphql';

export type SocialMedia = DeepOmit<
  NonNullable<QuerySiteOptionsQuery['optionsPage']>['socialMedia'],
  '__typename'
>;

export type DisableContextMenu = DeepOmit<
  NonNullable<
    NonNullable<QuerySiteOptionsQuery['optionsPage']>['websiteSettings']
  >['disableContextMenu'],
  '__typename'
>;
