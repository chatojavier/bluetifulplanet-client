import React from 'react';
import { render } from '@testing-library/react';
import { CommentStatusEnum } from '@app/graphql/__generated__/graphql';
import userEvent from '@testing-library/user-event';
import { Comment } from '@app/api/wp/comments/utils';
import CommentBox from './CommentBox';

jest.mock('next/image', () => ({ src, alt }: Record<string, string>) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} />
));

const mockCommentData: Comment = {
  author: {
    avatar: {
      url: 'avatar-url.jpg',
      width: 80,
      height: 80,
    },
    name: 'John Doe',
  },
  status: CommentStatusEnum.Approve,
  id: 'moced-comment-id',
  databaseId: 1,
  content: 'Some mocked content',
  date: '2023-11-01 00:28:31',
  parentId: null,
};

describe('CommentBox Component', () => {
  it('renders comment box with author name', () => {
    const onSubmitValid = jest.fn();
    const onCancel = jest.fn();
    const { getByText, getByTestId } = render(
      <CommentBox
        commentData={mockCommentData}
        onSubmitValid={onSubmitValid}
        showReplyForm
        onCancel={onCancel}
      />
    );

    const authorName = getByText('John Doe');
    expect(authorName).toBeInTheDocument();

    const replyForm = getByTestId('comment-reply-form');
    expect(replyForm).toBeInTheDocument();
  });

  it('displays child comments', () => {
    const { getByText } = render(
      <CommentBox commentData={mockCommentData}>
        <div>Child Comment 1</div>
        <div>Child Comment 2</div>
      </CommentBox>
    );

    const childComment1 = getByText('Child Comment 1');
    expect(childComment1).toBeInTheDocument();

    const childComment2 = getByText('Child Comment 2');
    expect(childComment2).toBeInTheDocument();
  });

  it('invokes onReply and onCancel functions', async () => {
    const onReply = jest.fn();
    const onCancel = jest.fn();
    const onSubmitValid = jest.fn();
    const { getByRole } = render(
      <CommentBox
        commentData={mockCommentData}
        onReply={onReply}
        onCancel={onCancel}
        onSubmitValid={onSubmitValid}
        showReplyForm
      />
    );

    const user = userEvent.setup();

    const replyButton = getByRole('button', { name: 'REPLY' });
    await user.click(replyButton);
    expect(onReply).toHaveBeenCalledTimes(1);

    const cancelButton = getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  it('invokes onSubmit functions', async () => {
    const onReply = jest.fn();
    const onCancel = jest.fn();
    const onSubmitValid = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <CommentBox
        commentData={mockCommentData}
        onReply={onReply}
        onCancel={onCancel}
        onSubmitValid={onSubmitValid}
        showReplyForm
      />
    );

    const user = userEvent.setup();

    const submitButton = getByRole('button', {
      name: /submit comment/i,
    });
    const commentInput = getByPlaceholderText('Your Comment');
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    await user.type(commentInput, 'mock comment');
    await user.type(nameInput, 'mock name');
    await user.type(emailInput, 'email@domain.com');
    await user.click(submitButton);
    expect(onSubmitValid).toHaveBeenCalledTimes(1);
  });
});
