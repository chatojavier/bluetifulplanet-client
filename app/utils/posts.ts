import { cloneDeep } from '@apollo/client/utilities/common/cloneDeep';
import {
  PostFieldsFragment,
  QueryPostsBasicQuery,
} from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from './general';
import { mapCommentData } from './comments';

export const mapPostData = (post: PostFieldsFragment) => {
  const postUpdated = cloneDeep(post);

  const data = {
    ...postUpdated,
    featuredImage: postUpdated.featuredImage
      ? postUpdated.featuredImage.node
      : null,
    author: postUpdated.author ? postUpdated.author.node : null,
    tags: postUpdated.tags ? postUpdated.tags.nodes : null,
    comments: postUpdated.comments
      ? postUpdated.comments.nodes.map(comment => mapCommentData(comment))
      : null,
  };

  return removeDeepProperty(data, '__typename');
};

export type PostMapped = ReturnType<typeof mapPostData>;

export const mapPostsBasic = (
  edge: NonNullable<QueryPostsBasicQuery['posts']>['edges'][number]
) => {
  const data = {
    cursor: edge.cursor,
    ...edge.node,
  };

  return removeDeepProperty(data, '__typename');
};
