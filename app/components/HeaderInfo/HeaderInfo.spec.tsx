import React from 'react';
import { render } from '@testing-library/react';
import { UserBasicFragment } from '@app/graphql/__generated__/graphql';
import HeaderInfo from './HeaderInfo';

const mockAuthor: UserBasicFragment = {
  __typename: 'User',
  name: 'John Doe',
  // ... other properties
};

describe('HeaderInfo', () => {
  it('renders author information when author prop is provided', () => {
    const { getByText } = render(
      <HeaderInfo author={mockAuthor} date="2023-01-01" />
    );

    const authorLink = getByText('John Doe');
    expect(authorLink).toBeInTheDocument();
    expect(authorLink.closest('a')).toHaveAttribute('href', '/about-me');
  });

  it('does not render author information when author prop is not provided', () => {
    const { queryByText } = render(
      <HeaderInfo date="2023-01-01" author={undefined} />
    );

    const authorLink = queryByText('John Doe');
    expect(authorLink).toBeNull();
  });

  it('renders date information when date prop is provided', () => {
    const { getByText } = render(
      <HeaderInfo author={mockAuthor} date="2023-01-01" />
    );

    const formattedDate = getByText('January 1st, 2023'); // Adjust this based on your formatDate implementation
    expect(formattedDate).toBeInTheDocument();
  });

  it('does not render date information when date prop is not provided', () => {
    const { queryByText } = render(
      <HeaderInfo author={mockAuthor} date={undefined} />
    );

    const formattedDate = queryByText('January 1st, 2023'); // Adjust this based on your formatDate implementation
    expect(formattedDate).toBeNull();
  });

  it('applies custom class name to the aside element', () => {
    const { getByRole } = render(
      <HeaderInfo
        author={mockAuthor}
        date="2023-01-01"
        className="custom-class"
      />
    );
    const asideElement = getByRole('complementary');
    expect(asideElement).toHaveClass('custom-class');
  });

  it('applies additional classes along with custom class name', () => {
    const { getByRole } = render(
      <HeaderInfo
        author={mockAuthor}
        date="2023-01-01"
        className="custom-class"
      />
    );
    const asideElement = getByRole('complementary');
    expect(asideElement).toHaveClass('post-related');
    expect(asideElement).toHaveClass('text-xs');
    expect(asideElement).toHaveClass('uppercase');
    expect(asideElement).toHaveClass('mb-4');
    expect(asideElement).toHaveClass('custom-class');
  });
});
