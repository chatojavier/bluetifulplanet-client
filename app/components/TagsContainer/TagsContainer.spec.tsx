import React from 'react';
import { render } from '@testing-library/react';
import TagsContainer from './TagsContainer';

const mockTags = [
  { name: 'Tag1', uri: '/tag1' },
  { name: 'Tag2', uri: '/tag2' },
  { name: 'Tag3', uri: null },
];

describe('TagsContainer', () => {
  it('renders tag links for each tag with a valid URI', () => {
    const { getAllByRole } = render(<TagsContainer tags={mockTags} />);
    const tagLinks = getAllByRole('link');

    expect(tagLinks).toHaveLength(2); // Only two tags have valid URIs
    expect(tagLinks[0]).toHaveAttribute('href', '/blog/tag1');
    expect(tagLinks[1]).toHaveAttribute('href', '/blog/tag2');
  });

  it('does not render tag links for tags with null or undefined URIs', () => {
    const { queryByRole } = render(<TagsContainer tags={mockTags} />);
    const tagLink = queryByRole('link', { name: 'Tag3' });

    expect(tagLink).toBeNull(); // Tag3 has null URI
  });

  it('renders tag names within tag links', () => {
    const { getByText } = render(<TagsContainer tags={mockTags} />);
    const tag1Link = getByText('Tag1');
    const tag2Link = getByText('Tag2');

    expect(tag1Link.closest('a')).toBeInTheDocument();
    expect(tag2Link.closest('a')).toBeInTheDocument();
  });

  it('applies the correct classes to the container div', () => {
    const { getByRole } = render(<TagsContainer tags={mockTags} />);
    const containerDiv = getByRole('group');

    expect(containerDiv).toHaveClass('tag-links');
    expect(containerDiv).toHaveClass('flex');
    expect(containerDiv).toHaveClass('justify-center');
    expect(containerDiv).toHaveClass('gap-4');
  });
});
