/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '@app/hooks/useWindowSize';
import useOutsideElement from '@app/hooks/useOutsideElement';
import useSwipe from '@app/hooks/useSwipe';
import useFixDocumentBody from '@app/hooks/useFixDocumentBody';
import { MediaItem } from '@api/wp/media-items/utils';
import Spinner from '../Spinner';
import InfoSection from './InfoSection';
import ImageSection from './ImageSection';
import PrevNextButton from './PrevNextButton';

interface GalleryModalProps {
  imageData: MediaItem;
  open: boolean;
  loading?: boolean;
  hasPrev?: boolean;
  hasNext?: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const GalleryModalOpen: FunctionComponent<Omit<GalleryModalProps, 'open'>> = ({
  imageData,
  loading,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { size: windowSize, isMobile } = useWindowSize();
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const {
    title,
    mediaTags,
    altText: alt = '',
    sourceUrl: src = '',
    description: subcopy,
    mediaDetails,
  } = imageData || {};
  const { width, height, meta } = mediaDetails || {};
  const tags =
    mediaTags?.map(tag => ({ label: tag.name || '', query: tag.slug || '' })) ||
    [];

  const handleResize = useCallback(() => {
    document.body.style.backgroundColor = '#fff';
    const img = imgRef.current;
    const imgWrapper = img?.parentElement;
    const imgWrapperPosition = imgWrapper?.getBoundingClientRect();
    img?.style.setProperty('width', `${imgWrapperPosition?.width}px`);
    img?.style.setProperty('height', `${imgWrapperPosition?.height}px`);
    img?.style.setProperty('top', `${imgWrapperPosition?.top}px`);
    img?.style.setProperty('left', `${imgWrapperPosition?.left}px`);
    img?.style.setProperty('opacity', '1');
  }, []);

  const handleExpand = useCallback(() => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    document.body.style.setProperty('background-color', 'rgb(0 0 0 / 100%)');
    const img = imgRef.current;
    img?.classList.add('transition-all', 'duration-500');
    if (!expanded) {
      img?.style.setProperty('background-color', 'rgb(0 0 0 / 100%)');
      img?.style.setProperty('top', '0');
      img?.style.setProperty('left', '0');
      img?.style.setProperty('width', '100%');
      img?.style.setProperty('height', '100%');
      setExpanded(true);
    } else {
      img?.style.setProperty('background-color', 'rgb(0 0 0 / 0)');
      handleResize();
      setExpanded(false);
    }
    setTimeout(() => {
      img?.classList.remove('transition-all', 'duration-500');
    }, 550);
  }, [expanded, handleResize]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);

  const swipeHandlers = useSwipe({
    onSwipedLeft: onNext || (() => null),
    onSwipedRight: onPrev || (() => null),
    onSwipedDown: expanded ? handleExpand : handleClose,
  });

  useFixDocumentBody();
  useOutsideElement([dialogRef, prevRef, nextRef], handleClose);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        expanded ? handleExpand() : handleClose();
      }
      if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      }
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [expanded, handleExpand, handleClose, onNext, onPrev]);

  useLayoutEffect(() => {
    if (!expanded) {
      handleResize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize, windowSize, imageData, loading]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`gallery-modal | fixed top-0 w-screen h-screen-sm bg-black bg-opacity-60 flex justify-center items-center z-20 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500`}
      data-testid="gallery-modal"
    >
      {onPrev && !isMobile && (
        <PrevNextButton
          ref={prevRef}
          onClick={onPrev}
          variant="prev"
          disabled={!hasPrev}
        />
      )}
      <div
        className={`gallery-modal__content | w-full h-full max-w-none max-h-none flex flex-col justify-center items-center | portrait:sm:max-w-[min(90%,600px)] portrait:sm:max-h-[min(90vh,1000px)] landscape:sm-h:max-w-[min(90%,1200px)] landscape:sm-h:max-h-[min(90vh,600px)] | landscape:flex-row landscape:h-screen `}
        ref={dialogRef}
        data-testid="gallery-modal-content"
        {...(!expanded && swipeHandlers)}
      >
        <div className="gallery-modal__image | bg-black w-full h-full">
          {loading ? (
            <div className="image-loading">
              <Spinner size="sm" className="mx-auto !block my-8" />
            </div>
          ) : (
            <ImageSection
              src={src || '/blurImage.jpg'}
              alt={alt || 'Image'}
              width={width || 0}
              height={height || 0}
              expanded={expanded}
              onClickExpand={handleExpand}
              ref={imgRef}
              {...swipeHandlers}
            />
          )}
        </div>
        <div className="gallery-modal__info | bg-white shrink-0 w-full | landscape:h-full landscape:w-[350px]">
          {loading ? (
            <div className="image-loading">
              <Spinner size="sm" className="mx-auto !block my-8" />
            </div>
          ) : (
            <InfoSection
              title={title || ''}
              subcopy={subcopy || ''}
              metadata={meta}
              tags={tags}
            />
          )}
        </div>
        <button
          type="button"
          className={`close-button | absolute top-4 right-6 text-white z-10 'transition-all', 'duration-500' ${
            expanded ? 'opacity-0' : 'pointer'
          }`}
          onClick={handleClose}
          data-testid="close-button"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {onNext && !isMobile && (
        <PrevNextButton
          ref={nextRef}
          onClick={onNext}
          variant="next"
          disabled={!hasNext}
        />
      )}
    </div>
  );
};

const GalleryModal: FunctionComponent<GalleryModalProps> = ({
  open,
  ...props
}) => (open ? <GalleryModalOpen {...props} /> : null);

export default GalleryModal;
