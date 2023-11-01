import { cloneDeep } from '@apollo/client/utilities/common/cloneDeep';
import {
  CommentFieldsFragment as Comment,
  CreateCommentMutation,
} from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from './general';

export const mapCommentData = (comment: Comment) => {
  const commentUpdated = cloneDeep(comment);

  const data = {
    ...commentUpdated,
    author: commentUpdated.author ? commentUpdated.author.node : null,
  };

  return removeDeepProperty(data, '__typename');
};

export type CommentMapped = ReturnType<typeof mapCommentData>;

export const mapCreateComment = (
  createComment: NonNullable<CreateCommentMutation['createComment']>
) => {
  const createCommentClone = cloneDeep(createComment);

  const data = {
    ...createCommentClone,
    comment: createCommentClone.comment
      ? mapCommentData(createCommentClone.comment)
      : null,
  };

  return removeDeepProperty(data, '__typename');
};

export type CreateCommentMapped = ReturnType<typeof mapCreateComment>;
