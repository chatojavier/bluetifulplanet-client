import { DeepOmit } from '@apollo/client/utilities/types/DeepOmit';
import {
  PostFieldsFragment as QueryPost,
  QueryPostsBasicQuery as QueryPostsBasic,
  QueryPostsResumesQuery,
} from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from '@utils/general';
import { mapCommentData, Comment } from '../comments/utils';

type QueryPostResume = NonNullable<
  QueryPostsResumesQuery['posts']
>['nodes'][number];

export type Post = DeepOmit<
  Omit<QueryPost, 'featuredImage' | 'author' | 'tags' | 'comments'> & {
    featuredImage: NonNullable<QueryPost['featuredImage']>['node'] | null;
    author: NonNullable<QueryPost['author']>['node'] | null;
    tags: NonNullable<QueryPost['tags']>['nodes'] | null;
    comments: Comment[] | null;
  },
  '__typename'
>;

export type PostResume = DeepOmit<
  Omit<QueryPostResume, 'featuredImage' | 'author'> & {
    featuredImage: NonNullable<QueryPostResume['featuredImage']>['node'] | null;
    author: NonNullable<QueryPostResume['author']>['node'] | null;
  },
  '__typename'
>;

export type PostBasic = DeepOmit<
  NonNullable<QueryPostsBasic['posts']>['nodes'][number],
  '__typename'
>;

export const mapPostData = (post: QueryPost): Post => {
  const data = {
    ...post,
    featuredImage: post.featuredImage ? post.featuredImage.node : null,
    author: post.author ? post.author.node : null,
    tags: post.tags ? post.tags.nodes : null,
    comments: post.comments
      ? post.comments.nodes.map(comment => mapCommentData(comment))
      : null,
  };

  return removeDeepProperty(data, '__typename');
};

export const mapPostResumeData = (post: QueryPostResume): PostResume => {
  const data = {
    ...post,
    featuredImage: post.featuredImage ? post.featuredImage.node : null,
    author: post.author ? post.author.node : null,
  };

  return removeDeepProperty(data, '__typename');
};
