import { TouchEvent, useState } from 'react';

interface SwipeInput {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
}

export interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export default (input: SwipeInput): SwipeOutput => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEndX(0); // otherwise the swipe is fired even with usual touch events
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndY(0);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const onTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const distance = touchStartX - touchEndX;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe && input.onSwipedLeft) {
        input.onSwipedLeft();
      }
      if (isRightSwipe && input.onSwipedRight) {
        input.onSwipedRight();
      }
    }
    if (touchStartY && touchEndY) {
      const distance = touchStartY - touchEndY;
      const isUpSwipe = distance > minSwipeDistance;
      const isDownSwipe = distance < -minSwipeDistance;
      if (isUpSwipe && input.onSwipedUp) {
        input.onSwipedUp();
      }
      if (isDownSwipe && input.onSwipedDown) {
        input.onSwipedDown();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
