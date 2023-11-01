import { render, screen } from '@testing-library/react';
import NavigationArrows from './NavigationArrows';

describe('NavigationArrows Component', () => {
  const label = 'Next Post';
  const url = '/next-post';
  it('renders NavigationArrows component with correct label and URL', () => {
    render(<NavigationArrows label={label} url={url} next />);

    const linkElement = screen.getByRole('link', { name: label });
    expect(linkElement).toHaveAttribute('href', url);
  });

  it('applies the correct styles based on the "next" prop', () => {
    const { rerender } = render(
      <NavigationArrows label={label} url={url} next />
    );

    let arrowContainer = screen.getByRole('link', { name: label });
    expect(arrowContainer).toHaveClass('text-right');

    // Re-render the component with 'next' prop as false
    rerender(<NavigationArrows label={label} url={url} next={false} />);

    arrowContainer = screen.getByRole('link', { name: label });
    expect(arrowContainer).toHaveClass('left-0');
  });
});
