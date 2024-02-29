import { Comment } from '@api/wp/comments/utils';

export type ParentComment = Comment & {
  children: Comment[];
};

export const orderNestedComments = (comments: Comment[]): ParentComment[] => {
  const nestedComments = comments.filter(comment => comment.parentId);
  const topLevelComments = comments.filter(comment => !comment.parentId);

  return topLevelComments.map(comment => {
    const children = nestedComments.filter(
      nestedComment => nestedComment.parentId === comment.id
    );
    return {
      ...comment,
      children,
    };
  });
};
