import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PreventContextMenu from './PreventContextMenu';

describe('PreventContextMenu', () => {
  beforeEach(() => {
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should prevent context menu and show message when right-clicked', async () => {
    render(<PreventContextMenu />);
    await userEvent.pointer({
      keys: '[MouseRight>]',
      target: document.documentElement,
    });

    const preventContextScreen = (
      await screen.findByText('Images cannot be downloaded from this website.')
    ).parentElement as HTMLElement;

    expect(preventContextScreen).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
    await waitFor(
      () => {
        expect(preventContextScreen).toHaveClass('opacity-100');
      },
      { timeout: 100 }
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      'contextmenu',
      expect.any(Function)
    );
  });

  it('should hide message and enable scroll when clicked', async () => {
    const { unmount } = render(<PreventContextMenu />);
    await userEvent.pointer({
      keys: '[MouseRight>]',
      target: document.documentElement,
    });

    const preventContextScreen = (
      await screen.findByText('Images cannot be downloaded from this website.')
    ).parentElement as HTMLElement;

    expect(preventContextScreen).toBeInTheDocument();

    await userEvent.click(preventContextScreen);

    expect(preventContextScreen).toHaveClass('opacity-0');
    await waitFor(
      () => {
        expect(preventContextScreen).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );
    expect(document.body.style.overflow).toBe('auto');

    unmount();
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'contextmenu',
      expect.any(Function)
    );
  });
});
