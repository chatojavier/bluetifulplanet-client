import { render, screen } from '@testing-library/react';
import Drawer from './Drawer';

describe('Drawer', () => {
  const content = 'This is the Content';
  it('should render properly and be visible when open is true', () => {
    render(
      <Drawer open>
        <div>{content}</div>
      </Drawer>
    );

    const drawerElement = screen.getByTestId('drawer-wrapper');
    expect(drawerElement).toBeInTheDocument();
    expect(drawerElement).toHaveClass('w-80 px-16');
  });
  it('should be hide when open is false', () => {
    render(
      <Drawer open={false}>
        <div>{content}</div>
      </Drawer>
    );

    const drawerElement = screen.getByTestId('drawer-wrapper');
    expect(drawerElement).toBeInTheDocument();
    expect(drawerElement).toHaveClass('w-0 p-0');
  });
});
