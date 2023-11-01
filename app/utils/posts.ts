import { cloneDeep } from '@apollo/client/utilities/common/cloneDeep';
import {
  PostFieldsFragment,
  QueryPostsBasicQuery,
  QueryPrevNextPostQuery,
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

type RelatedPost = NonNullable<QueryPrevNextPostQuery['posts']>;

export const mapPrevNextPost = (post: RelatedPost) => {
  const {
    pageInfo: { hasNextPage, hasPreviousPage },
    nodes: [prevPost, nextPost],
  } = post;
  const getLink = (node: RelatedPost['nodes'][number]) =>
    node && node.title && node.slug
      ? {
          id: node.id,
          label: node.title,
          url: node.slug,
        }
      : null;
  return {
    prevLink: hasPreviousPage ? getLink(prevPost) : null,
    nextLink:
      hasNextPage && !hasPreviousPage ? getLink(prevPost) : getLink(nextPost),
  };
};
