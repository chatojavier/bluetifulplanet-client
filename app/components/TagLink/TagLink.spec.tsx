import { render } from '@testing-library/react';
import TagLink from './TagLink';

describe('TagLink', () => {
  it('should render properly', () => {
    const mockLabel = 'mockLabel';
    const mockHref = '/mockHref';
    const { getByText } = render(
      <TagLink href={mockHref}>{mockLabel}</TagLink>
    );

    const svgTagLink = getByText(mockLabel) as HTMLLinkElement;
    expect(svgTagLink).toBeInTheDocument();
    expect(svgTagLink.getAttribute('href')).toBe(mockHref);
  });
});
