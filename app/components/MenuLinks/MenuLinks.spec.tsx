import { mockMenuLinks } from '@app/__mocks__/menus.mock';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import MenuLinks from './MenuLinks';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));

describe('MenuLinks', () => {
  const setOpen = jest.fn();
  it('should render links passed as prop', () => {
    render(<MenuLinks links={mockMenuLinks} open setOpen={setOpen} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Photos')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });
  it('should show submenu when click on a link parent', async () => {
    const user = userEvent.setup();
    render(<MenuLinks links={mockMenuLinks} open setOpen={setOpen} />);
    const photosLink = screen.getByText('Photos');

    const mainGallery = screen.getByText('Main Gallery');
    const personalFavorites = screen.getByText('Personal Favorites');
    const pollinators = screen.getByText('Pollinators & Light');

    const invisibleClass = 'opacity-0';
    const visibleClass = 'opacity-100';

    expect(mainGallery).toHaveClass(invisibleClass);
    expect(personalFavorites).toHaveClass(invisibleClass);
    expect(pollinators).toHaveClass(invisibleClass);

    await user.click(photosLink);

    expect(mainGallery).toHaveClass(visibleClass);
    expect(personalFavorites).toHaveClass(visibleClass);
    expect(pollinators).toHaveClass(visibleClass);
  });
  it('should redirect to "/blog" when click on Blog link', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    const user = userEvent.setup();

    render(<MenuLinks links={mockMenuLinks} open setOpen={setOpen} />);
    const blogLink = screen.getByText('Blog');

    await user.click(blogLink);

    expect(mockPush).toHaveBeenCalledWith('/blog/');
  });
});
