import {
  PostFieldsFragment,
  QueryPostsResumesQuery,
} from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from './general';
import { mapCommentData } from './comments';

export const mapPostData = (post: PostFieldsFragment) => {
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

export type PostMapped = ReturnType<typeof mapPostData>;

export const mapPostResumeData = (
  post: NonNullable<QueryPostsResumesQuery['posts']>['nodes'][0]
) => {
  const data = {
    ...post,
    featuredImage: post.featuredImage ? post.featuredImage.node : null,
    author: post.author ? post.author.node : null,
  };

  return removeDeepProperty(data, '__typename');
};

export type PostResumeMapped = ReturnType<typeof mapPostResumeData>;
