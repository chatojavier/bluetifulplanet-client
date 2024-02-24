import { DeepOmit } from '@app/types/general';
import { CommentFieldsFragment as QueryComment } from '@app/graphql/__generated__/graphql';
import { removeDeepProperty } from '@utils/general';

export type Comment = DeepOmit<
  Omit<QueryComment, 'author'> & {
    author: NonNullable<QueryComment['author']>['node'] | null;
  },
  '__typename'
>;

export const mapCommentData = (comment: QueryComment): Comment => {
  const data = {
    ...comment,
    author: comment.author ? comment.author.node : null,
  };

  return removeDeepProperty(data, '__typename');
};
