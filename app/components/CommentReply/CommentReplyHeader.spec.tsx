import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentReplyHeader from './CommentReplyHeader';

const cancelReply = 'Cancel reply';
const mockCancel = jest.fn();

describe('CommentReplyHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders "Leave a Reply" if no name is provided', () => {
    render(<CommentReplyHeader name={null} />);
    expect(screen.getByText('Leave a Reply')).toBeInTheDocument();
  });

  it('renders "Reply to [Name]" if a name is provided', () => {
    render(<CommentReplyHeader name="John" />);
    expect(screen.getByText('Reply to John')).toBeInTheDocument();
  });

  it('triggers the onCancel function when "Cancel reply" is clicked', async () => {
    render(<CommentReplyHeader name="Jane" onCancel={mockCancel} />);

    const cancelReplyButton = screen.getByRole('button', { name: cancelReply });
    await userEvent.click(cancelReplyButton);

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it('triggers the onCancel function when "Cancel reply" is focused and "Enter" is pressed', async () => {
    render(<CommentReplyHeader name="Jane" onCancel={mockCancel} />);

    const cancelReplyButton = screen.getByRole('button', { name: cancelReply });
    cancelReplyButton.focus();

    fireEvent.keyDown(document.activeElement as Element, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onCancel function when "Escape" is pressed', async () => {
    render(<CommentReplyHeader name="Jane" onCancel={mockCancel} />);

    const cancelReplyButton = screen.getByRole('button', { name: cancelReply });
    cancelReplyButton.focus();

    fireEvent.keyDown(document.activeElement as Element, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(mockCancel).not.toHaveBeenCalled();
  });
});
