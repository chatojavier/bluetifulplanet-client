import { FunctionComponent } from 'react';
import { useSwiper } from 'swiper/react';

const FullSliderNavigation: FunctionComponent = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute h-full w-full top-0 flex z-10 portrait:hidden">
      <div
        className="navigation-left h-full flex-1 cursor-w-resize"
        onClick={() => swiper.slidePrev()}
        onKeyDown={() => swiper.slidePrev()}
        role="button"
        tabIndex={0}
        aria-label="prev-slide"
      />
      <div
        className="navigation-right h-full flex-1 cursor-e-resize"
        onClick={() => swiper.slideNext()}
        onKeyDown={() => swiper.slideNext()}
        role="button"
        tabIndex={0}
        aria-label="next-slide"
      />
    </div>
  );
};

export default FullSliderNavigation;
