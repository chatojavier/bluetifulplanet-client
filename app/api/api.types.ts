import { GraphQLError } from 'graphql/error/GraphQLError';

const root = '/api';
const wp = `${root}/wp`;

// eslint-disable-next-line no-shadow
export enum ApiRoutes {
  SETTINGS = `${wp}/settings`,
  OPTIONS = `${wp}/options`,
  POSTS = `${wp}/posts`,
  POSTS_RESUME = `${wp}/posts/resume`,
  POSTS_BASIC = `${wp}/posts/basic`,
  PAGES = `${wp}/pages`,
  HOMEPAGE = `${wp}/pages/home`,
  PAGES_BASIC = `${wp}/pages/basic`,
  MENUS = `${wp}/menus`,
  COMMENTS = `${wp}/comments`,
  GALLERIES = `${wp}/galleries`,
  GALLERIES_BASIC = `${wp}/galleries/basic`,
  MEDIA_ITEMS = `${wp}/media-items`,
  CONTACT = `${wp}/contact`,
  MEDIA_TAGS = `${wp}/taxnomies/media-tags`,
  GRAPHQL = '/graphql',
  CONTACT_FORM = '/wp-json/contact-form-7/v1/contact-forms',
}

export type ApiWpReturn<T> = {
  data: T;
  errors?: readonly GraphQLError[] | undefined;
};
