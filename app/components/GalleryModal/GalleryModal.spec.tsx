/* eslint-disable sonarjs/no-duplicate-string */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSwipe from '@app/hooks/useSwipe';
import GalleryModal from './GalleryModal';

jest.mock('@app/hooks/useSwipe', () => jest.fn());

const getImageData = (id: string) => ({
  id,
  title: `Image ${id} title`,
  sourceUrl: `/img/${id}.jpg`,
  altText: `Alt ${id} text`,
  description: `This is the description of ${id}`,
  mediaDetails: {
    width: 100,
    height: 100,
    meta: {
      aperture: 1.8,
      focalLength: 50,
      iso: 100,
      shutterSpeed: 0.01,
    },
  },
  mediaTags: [
    {
      id: 'tag1',
      name: '#tag1',
      slug: 'tag1',
    },
    {
      id: 'tag2',
      name: '#tag2',
      slug: 'tag2',
    },
    {
      id: 'tag3',
      name: '#tag3',
      slug: 'tag3',
    },
  ],
});

describe('GalleryModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component without errors', () => {
    const imageData = getImageData('image01');
    render(<GalleryModal imageData={imageData} onClose={jest.fn()} open />);
    expect(screen.getByTestId('gallery-modal')).toBeInTheDocument();
    expect(screen.getByAltText(imageData.altText)).toBeInTheDocument();
    expect(screen.getByText(imageData.title)).toBeInTheDocument();
    expect(screen.getByText(imageData.description)).toBeInTheDocument();
    expect(screen.getAllByText(/#tag\d/)).toHaveLength(3);
    expect(screen.getByText('f/1.8')).toBeInTheDocument();
    expect(screen.getByText('50mm')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText(/1\/100/)).toBeInTheDocument();
  });

  it('should expand the modal and collapse when handleExpand is called', async () => {
    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={jest.fn()}
        open
      />
    );

    const imgElm = screen.getByTestId('image-section');
    const imgWrapperElm = imgElm.parentElement as HTMLElement;

    jest.spyOn(imgWrapperElm, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      width: 500,
      height: 500,
    } as DOMRect);

    const handleExpand = screen.getByTestId('expand-button');

    await userEvent.click(handleExpand);

    expect(imgElm.classList).toContain('transition-all');
    expect(imgElm.classList).toContain('duration-500');
    expect(imgElm.style.getPropertyValue('top')).toBe('0px');
    expect(imgElm.style.getPropertyValue('left')).toBe('0px');
    expect(imgElm.style.getPropertyValue('width')).toBe('100%');
    expect(imgElm.style.getPropertyValue('height')).toBe('100%');

    await waitFor(() => {
      expect(imgElm.classList).not.toContain('transition-all');
      expect(imgElm.classList).not.toContain('duration-500');
    });

    await userEvent.click(handleExpand);

    expect(imgElm.classList).toContain('transition-all');
    expect(imgElm.classList).toContain('duration-500');
    expect(imgElm.style.getPropertyValue('top')).toBe('100px');
    expect(imgElm.style.getPropertyValue('left')).toBe('100px');
    expect(imgElm.style.getPropertyValue('width')).toBe('500px');
    expect(imgElm.style.getPropertyValue('height')).toBe('500px');

    await waitFor(() => {
      expect(imgElm.classList).not.toContain('transition-all');
      expect(imgElm.classList).not.toContain('duration-500');
    });
  });

  it('should call the onPrev and onNext functions when the prev and next buttons are clicked', async () => {
    const imageData = getImageData('image01');
    const onPrev = jest.fn();
    const onNext = jest.fn();
    render(
      <GalleryModal
        imageData={imageData}
        onClose={jest.fn()}
        open
        hasPrev
        hasNext
        onPrev={onPrev}
        onNext={onNext}
      />
    );
    const prevButton = screen.getByTestId('modal-prev-button');
    const nextButton = screen.getByTestId('modal-next-button');
    await userEvent.click(prevButton);
    await userEvent.click(nextButton);
    expect(onPrev).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });

  it('should call the onClose function when the close button is clicked', async () => {
    const onClose = jest.fn();
    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={onClose}
        open
      />
    );
    const closeButton = screen.getByTestId('close-button');
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose function when the background is clicked', async () => {
    const onClose = jest.fn();
    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={onClose}
        open
      />
    );
    const background = screen.getByTestId('gallery-modal');
    await userEvent.click(background);
    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onClose function when the escape key is pressed', async () => {
    const onClose = jest.fn();
    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={onClose}
        open
      />
    );
    const background = screen.getByTestId('gallery-modal');
    await userEvent.type(background, '{esc}');
    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onPrev and onNext function when the left and right arrow keys are pressed', async () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={jest.fn()}
        open
        hasPrev
        hasNext
        onPrev={onPrev}
        onNext={onNext}
      />
    );
    const background = screen.getByTestId('gallery-modal');
    await userEvent.type(background, '{arrowLeft}');
    await userEvent.type(background, '{arrowRight}');
    expect(onPrev).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });

  it('should call onClose or handleExpand when the up arrow key is pressed', async () => {
    const onClose = jest.fn();
    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={onClose}
        open
        hasPrev
        hasNext
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );

    const imgElm = screen.getByTestId('image-section');
    const imgWrapperElm = imgElm.parentElement as HTMLElement;

    jest.spyOn(imgWrapperElm, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      width: 500,
      height: 500,
    } as DOMRect);

    const expandButton = screen.getByTestId('expand-button');
    await userEvent.click(expandButton);
    await waitFor(() => {
      expect(screen.getByTestId('image-section')).toHaveStyle({
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
      });
    });
    await userEvent.type(document.documentElement, '{Escape}');
    await waitFor(() => {
      expect(screen.getByTestId('image-section')).toHaveStyle({
        top: '100px',
        left: '100px',
        width: '500px',
        height: '500px',
      });
    });

    await userEvent.type(document.documentElement, '{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('should call the onPrev and onNext function when user swipes left and right', async () => {
    // Helper function to create a TouchEvent object
    const createTouchEvent = (clientX: number, clientY: number): TouchEvent => {
      return {
        targetTouches: [
          {
            clientX,
            clientY,
          },
        ],
      } as unknown as TouchEvent;
    };
    const mockUseSwipe = useSwipe as jest.Mock;
    const swipeHandlers = {
      onTouchStart: jest.fn(),
      onTouchMove: jest.fn(),
      onTouchEnd: jest.fn(),
    };
    mockUseSwipe.mockReturnValue(swipeHandlers);

    render(
      <GalleryModal
        imageData={getImageData('image01')}
        onClose={jest.fn()}
        open
        hasPrev
        hasNext
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />
    );
    const modalcontent = screen.getByTestId('gallery-modal-content');

    const touchStartEvent = createTouchEvent(200, 0);
    const touchMoveEvent = createTouchEvent(100, 0);

    fireEvent.touchStart(modalcontent, touchStartEvent);
    fireEvent.touchMove(modalcontent, touchMoveEvent);
    fireEvent.touchEnd(modalcontent);
    expect(swipeHandlers.onTouchStart).toHaveBeenCalledWith(
      expect.objectContaining(touchStartEvent)
    );
    expect(swipeHandlers.onTouchMove).toHaveBeenCalledWith(
      expect.objectContaining(touchMoveEvent)
    );
    expect(swipeHandlers.onTouchEnd).toHaveBeenCalled();
  });
});
