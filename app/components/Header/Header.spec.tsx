import { mockMenuLinks } from '@app/__mocks__/menus.mock';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Header from './Header';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('Header', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { container } = render(<Header />);
    expect(container).toBeDefined();
  });
  it('should redirect to "/" when click on logo', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    const user = userEvent.setup();

    render(<Header />);
    const logoElm = screen.getByRole('img', {
      name: /bluetiful planet logo/i,
    });

    await user.click(logoElm);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
  it('should open the Drawer when click on BurgerMenu and close when click a link', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    const user = userEvent.setup();

    render(<Header menuLinks={mockMenuLinks} />);
    const burgerMenu = screen.getByTestId('burger-menu-label');
    const drawer = screen.getByTestId('drawer-wrapper');

    expect(drawer).toHaveClass('close');

    await user.click(burgerMenu);

    expect(drawer).toHaveClass('open');

    const blogElm = screen.getByRole('link', {
      name: /blog/i,
    });

    await user.click(blogElm);

    expect(drawer).toHaveClass('close');
  });
  it('should close the Drawer when clicking outside of it', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);

    const burgerMenu = screen.getByTestId('burger-menu-label');
    const drawer = screen.getByTestId('drawer-wrapper');

    await user.click(burgerMenu);

    expect(drawer).toHaveClass('open');

    await user.click(container);

    expect(drawer).toHaveClass('close');
  });
});
