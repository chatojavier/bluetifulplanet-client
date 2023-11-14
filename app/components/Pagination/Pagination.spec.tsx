import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const props = {
    path: '/example',
    currentPage: 2,
    totalPages: 5,
  };

  it('renders the correct number of pages', () => {
    render(<Pagination {...props} />);
    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(props.totalPages + 2);
  });

  it('renders the current page as active', () => {
    render(<Pagination {...props} />);
    const activePageLink = screen.getByRole('link', {
      name: `${props.currentPage}`,
    });
    expect(activePageLink).toHaveClass('active');
  });

  it('renders the correct page links', () => {
    render(<Pagination {...props} />);
    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(props.totalPages + 2);

    pageLinks.forEach((pageLink, index) => {
      let expectedPageNumber;
      if (index === 0) {
        expectedPageNumber = 'Previous';
      } else if (index === pageLinks.length - 1) {
        expectedPageNumber = 'Next';
      } else {
        expectedPageNumber = index;
      }
      let expectedHref;
      if (index === 0) {
        expectedHref = `${props.path}?page=${props.currentPage - 1}`;
      } else if (index === pageLinks.length - 1) {
        expectedHref = `${props.path}?page=${props.currentPage + 1}`;
      } else {
        expectedHref = `${props.path}?page=${expectedPageNumber}`;
      }
      expect(pageLink).toHaveTextContent(expectedPageNumber.toString());
      expect(pageLink).toHaveAttribute('href', expectedHref);
      expect(pageLink).toContainElement(
        screen.getByText(expectedPageNumber.toString())
      );
    });
  });
});
