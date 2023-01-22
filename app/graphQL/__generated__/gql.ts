/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query queryAllMenus {\n    menus {\n      nodes {\n        id\n        menuItems {\n          nodes {\n            id\n            parentId\n            label\n            path\n          }\n        }\n        name\n        slug\n        locations\n      }\n    }\n  }\n": types.QueryAllMenusDocument,
    "\n  query querySiteOptions {\n    optionsPage {\n      socialMedia {\n        socialMediaFacebook {\n          show\n          url\n        }\n        socialMediaInstagram {\n          show\n          url\n        }\n        socialMediaFlickr {\n          show\n          url\n        }\n        socialMediaBehance {\n          show\n          url\n        }\n      }\n    }\n  }\n": types.QuerySiteOptionsDocument,
    "\n  query querySiteData {\n    generalSettings {\n      description\n      language\n      title\n    }\n    favicon {\n      mediaDetails {\n        sizes {\n          sourceUrl\n          width\n        }\n      }\n    }\n  }\n": types.QuerySiteDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query queryAllMenus {\n    menus {\n      nodes {\n        id\n        menuItems {\n          nodes {\n            id\n            parentId\n            label\n            path\n          }\n        }\n        name\n        slug\n        locations\n      }\n    }\n  }\n"): (typeof documents)["\n  query queryAllMenus {\n    menus {\n      nodes {\n        id\n        menuItems {\n          nodes {\n            id\n            parentId\n            label\n            path\n          }\n        }\n        name\n        slug\n        locations\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query querySiteOptions {\n    optionsPage {\n      socialMedia {\n        socialMediaFacebook {\n          show\n          url\n        }\n        socialMediaInstagram {\n          show\n          url\n        }\n        socialMediaFlickr {\n          show\n          url\n        }\n        socialMediaBehance {\n          show\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query querySiteOptions {\n    optionsPage {\n      socialMedia {\n        socialMediaFacebook {\n          show\n          url\n        }\n        socialMediaInstagram {\n          show\n          url\n        }\n        socialMediaFlickr {\n          show\n          url\n        }\n        socialMediaBehance {\n          show\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query querySiteData {\n    generalSettings {\n      description\n      language\n      title\n    }\n    favicon {\n      mediaDetails {\n        sizes {\n          sourceUrl\n          width\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query querySiteData {\n    generalSettings {\n      description\n      language\n      title\n    }\n    favicon {\n      mediaDetails {\n        sizes {\n          sourceUrl\n          width\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;