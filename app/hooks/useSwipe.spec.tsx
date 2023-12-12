import { TouchEvent } from 'react';
import { renderHook, act } from '@testing-library/react';
import useSwipe from './useSwipe';

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

describe('useSwipe', () => {
  const onSwipedLeft = jest.fn();
  const onSwipedRight = jest.fn();
  const onSwipedUp = jest.fn();
  const onSwipedDown = jest.fn();

  beforeEach(() => {
    onSwipedLeft.mockClear();
    onSwipedRight.mockClear();
    onSwipedUp.mockClear();
    onSwipedDown.mockClear();
  });

  it('should call onSwipedLeft when swiped left', async () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedLeft,
      })
    );

    await act(async () => {
      result.current.onTouchStart(createTouchEvent(200, 0));
    });
    await act(async () => {
      result.current.onTouchMove(createTouchEvent(100, 0));
    });
    await act(async () => {
      result.current.onTouchEnd();
    });

    expect(onSwipedLeft).toHaveBeenCalled();
  });

  it('should call onSwipedRight when swiped right', async () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedRight,
      })
    );

    await act(async () => {
      result.current.onTouchStart(createTouchEvent(100, 0));
    });
    await act(async () => {
      result.current.onTouchMove(createTouchEvent(200, 0));
    });
    await act(async () => {
      result.current.onTouchEnd();
    });

    expect(onSwipedRight).toHaveBeenCalled();
  });

  it('should call onSwipedUp when swiped up', async () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedUp,
      })
    );

    await act(async () => {
      result.current.onTouchStart(createTouchEvent(0, 200));
    });
    await act(async () => {
      result.current.onTouchMove(createTouchEvent(0, 100));
    });
    await act(async () => {
      result.current.onTouchEnd();
    });

    expect(onSwipedUp).toHaveBeenCalled();
  });

  it('should call onSwipedDown when swiped down', async () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedDown,
      })
    );

    await act(async () => {
      result.current.onTouchStart(createTouchEvent(0, 100));
    });
    await act(async () => {
      result.current.onTouchMove(createTouchEvent(0, 200));
    });
    await act(async () => {
      result.current.onTouchEnd();
    });

    expect(onSwipedDown).toHaveBeenCalled();
  });

  it('should not call any swipe callbacks when swipe distance is less than minSwipeDistance', async () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedLeft,
        onSwipedRight,
        onSwipedUp,
        onSwipedDown,
      })
    );

    await act(async () => {
      result.current.onTouchStart(createTouchEvent(10, 0));
    });
    await act(async () => {
      result.current.onTouchMove(createTouchEvent(20, 0));
    });
    await act(async () => {
      result.current.onTouchEnd();
    });

    expect(onSwipedLeft).not.toHaveBeenCalled();
    expect(onSwipedRight).not.toHaveBeenCalled();
    expect(onSwipedUp).not.toHaveBeenCalled();
    expect(onSwipedDown).not.toHaveBeenCalled();
  });
});
