import React from 'react';
import { render } from '@testing-library/react';
import HeaderTitle from '@components/HeaderTitle';

describe('HeaderTitle', () => {
  it('renders with default h1 tag when no type is provided', () => {
    const { getByRole } = render(<HeaderTitle title="Test Title" />);
    const headerElement = getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Test Title');
  });

  it('renders with the correct type when specified', () => {
    const { getByRole } = render(<HeaderTitle title="Test Title" type="h3" />);
    const headerElement = getByRole('heading', { level: 3 });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Test Title');
  });

  it('applies custom class name to the header element', () => {
    const { getByRole } = render(
      <HeaderTitle title="Test Title" className="custom-class" />
    );
    const headerElement = getByRole('heading', { level: 1 });
    expect(headerElement).toHaveClass('custom-class');
  });

  it('applies additional classes along with custom class name', () => {
    const { getByRole } = render(
      <HeaderTitle title="Test Title" className="custom-class" />
    );
    const headerElement = getByRole('heading', { level: 1 });
    expect(headerElement).toHaveClass('post-title');
    expect(headerElement).toHaveClass('text-4xl');
    expect(headerElement).toHaveClass('mb-5');
    expect(headerElement).toHaveClass('custom-class');
  });
});
