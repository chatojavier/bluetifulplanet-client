import { gql } from './__generated__';

export const USER_BASIC = gql(`
  fragment UserBasic on User {
    name
    url
  }
`);
