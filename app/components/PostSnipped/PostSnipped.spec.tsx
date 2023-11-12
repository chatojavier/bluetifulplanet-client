import { render, screen } from '@testing-library/react';
import PostSnipped from './PostSnipped';

describe('PostSnipped', () => {
  const props = {
    title: 'Test Title',
    excerpt: 'Test Excerpt',
    featuredImage: {
      id: '1',
      sourceUrl: 'https://example.com/image.jpg',
      altText: 'Test Alt Text',
      mediaDetails: {
        width: 100,
        height: 100,
      },
    },
    author: {
      name: 'Test Author',
      url: 'https://example.com/author',
    },
    date: '2022-02-22T22:22:22',
    slug: 'test-slug',
  };

  const postPath = '/blog/test-slug';

  it('should render title, excerpt, featuredImage, author, date and links properly', () => {
    render(<PostSnipped {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.excerpt)).toBeInTheDocument();
    expect(
      screen.getByAltText(props.featuredImage.altText)
    ).toBeInTheDocument();
    expect(screen.getByText(props.author.name)).toBeInTheDocument();
    expect(screen.getByText('February 22nd, 2022')).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', postPath);
    expect(links[1]).toHaveAttribute('href', '/about-me');
    expect(links[2]).toHaveAttribute('href', postPath);
    expect(links[3]).toHaveAttribute('href', postPath);
  });
});
