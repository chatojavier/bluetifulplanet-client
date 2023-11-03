/* eslint-disable sonarjs/no-duplicate-string */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentReplyForm from './CommentReplyForm';

describe('CommentReplyForm Component', () => {
  it('renders form fields and submit button', () => {
    render(<CommentReplyForm onSubmitValid={jest.fn()} />);

    const commentTextarea = screen.getByPlaceholderText('Your Comment');
    expect(commentTextarea).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Name');
    expect(nameInput).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();

    const websiteInput = screen.getByPlaceholderText('Website');
    expect(websiteInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Submit Comment' });
    expect(submitButton).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<CommentReplyForm onSubmitValid={mockSubmit} />);

    const commentTextarea = screen.getByPlaceholderText('Your Comment');
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const websiteInput = screen.getByPlaceholderText('Website');
    const submitButton = screen.getByRole('button', { name: 'Submit Comment' });

    fireEvent.change(commentTextarea, {
      target: { value: 'This is a test comment' },
    });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(websiteInput, {
      target: { value: 'https://example.com' },
    });

    fireEvent.click(submitButton);

    // Wait for the submit function to be called
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        content: 'This is a test comment',
        author: 'John Doe',
        authorEmail: 'test@example.com',
        authorUrl: 'https://example.com',
      });
    });
  });

  it('handles form submission error', async () => {
    const mockSubmit = jest.fn();
    const mockSubmitError = jest.fn();

    render(
      <CommentReplyForm
        onSubmitValid={mockSubmit}
        onSubmitError={mockSubmitError}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Submit Comment' });

    fireEvent.click(submitButton);

    // Wait for the error to be handled
    await waitFor(() => {
      expect(mockSubmitError).toHaveBeenCalled();
    });
  });

  // Additional test cases can be added to simulate form submission with invalid data and error handling
});
