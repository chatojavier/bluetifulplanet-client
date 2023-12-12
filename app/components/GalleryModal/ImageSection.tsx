import { forwardRef, useEffect, useState, TouchEvent } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { CompressArrows, ExpandArrows } from '../Icons';

interface ImageSectionProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  expanded: boolean;
  onClickExpand: () => void;
  onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: () => void;
}

const ImageSection = forwardRef<HTMLDivElement, ImageSectionProps>(
  (
    { src, alt, width, height, expanded, onClickExpand, ...swipeHandlers },
    ref
  ) => {
    const [viewSwipeAlert, setViewSwipeAlert] = useState<boolean>(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setViewSwipeAlert(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <div
        className="image-section | absolute bg-black"
        ref={ref}
        style={{ opacity: 0 }}
        data-testid="image-section"
        {...(expanded && swipeHandlers)}
      >
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          blurDataURL="/blurImage.jpg"
          width={width}
          height={height}
          className="object-contain w-full h-full"
        />
        <button
          type="button"
          className="gallery-modal__close | absolute top-4 left-4 z-20 text-white p-2 rounded-full rotate-90 non-touch:opacity-30 hover:opacity-100"
          onClick={onClickExpand}
          data-testid="expand-button"
        >
          {expanded ? <CompressArrows /> : <ExpandArrows />}
        </button>
        <div
          className={`swipe-alert | mobile-all:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 py-2 px-4 rounded-full whitespace-nowrap transition-all duration-500 ${
            viewSwipeAlert ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <span className="text-white text-sm space-x-2">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Swipe left or right to navigate</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </div>
    );
  }
);

export default ImageSection;
