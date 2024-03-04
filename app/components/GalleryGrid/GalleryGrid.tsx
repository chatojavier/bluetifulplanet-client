'use client';

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useSWRInfinite from 'swr/infinite';
import useWindowSize from '@app/hooks/useWindowSize';
import useOnScreen from '@app/hooks/useOnScreen';
import { Breakpoint } from '@app/types/general';
import { MediaItem } from '@app/api/wp/media-items/utils';
import MediaItemsService from '@app/services/MediaItemsService';
import { preload } from 'swr';
import Spinner from '../Spinner/Spinner';
import { getItemsPerPage, concatColumns, concatNestedArray } from './utils';
import GalleryImage from '../GalleryImage/GalleryImage';
import GalleryModal from '../GalleryModal/GalleryModal';
import PreloadImages from './PreloadImages';

export type ImageResponse = {
  mediaItems: MediaItem[];
};

interface GalleryGridProps {
  photosId: string[];
  photosPerPage?: number;
  fallback?: ImageResponse;
}

const GalleryGrid: FunctionComponent<GalleryGridProps> = ({
  photosId,
  photosPerPage = 15,
  fallback = { mediaItems: [] },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [preloadImages, setPreloadImages] = useState<MediaItem[]>(
    fallback.mediaItems
  );
  const [scrollRef, isVisible] = useOnScreen({
    threshold: 0,
  });
  const { breakpoint } = useWindowSize();
  const totalPages = Math.ceil(photosId.length / photosPerPage);
  const imageSizes =
    '(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 640px) 50vw, 100vw';

  const {
    data,
    isLoading,
    size: pageSize,
    setSize,
  } = useSWRInfinite(
    index =>
      index < totalPages && getItemsPerPage(photosId, index, photosPerPage),
    key => MediaItemsService.getMediaItemsById(key),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      revalidateFirstPage: false,
      revalidateAll: false,
      revalidateIfStale: false,
    }
  );

  const columns = useMemo(() => {
    const numColumns = {
      [Breakpoint.XS]: 1,
      [Breakpoint.SM]: 2,
      [Breakpoint.MD]: 2,
      [Breakpoint.LG]: 3,
      [Breakpoint.XL]: 4,
      [Breakpoint.XXL]: 4,
    };

    return breakpoint != null
      ? concatColumns(data || [fallback], numColumns[breakpoint])
      : [];
  }, [breakpoint, data, fallback]);

  const isLoadingMore =
    isLoading ||
    (pageSize > 0 && data && typeof data[pageSize - 1] === 'undefined');

  const notNestedDataArray = concatNestedArray(columns);

  const handleGalleryImageClick = (image: MediaItem) => {
    const imageIndex = notNestedDataArray.findIndex(
      item => item.id === image.id
    );
    setCurrentImageIndex(imageIndex);
    setIsOpen(true);
  };

  const handlePrevNext = useCallback(
    (variant: 'next' | 'prev') => {
      if (
        currentImageIndex === null ||
        (variant === 'prev' && currentImageIndex === 0)
      )
        return;
      if (
        variant === 'next' &&
        currentImageIndex === (notNestedDataArray?.length || 0) - 1
      ) {
        if (pageSize < totalPages) {
          setCurrentImageIndex(prev => prev + 1);
        } else {
          setCurrentImageIndex(0);
        }
      }
      if (
        currentImageIndex === notNestedDataArray.length - 4 &&
        pageSize < totalPages
      ) {
        setSize(pageSize + 1);
      }
      const indexToCall =
        variant === 'prev' ? currentImageIndex - 1 : currentImageIndex + 1;
      if (indexToCall >= 0 && indexToCall < (notNestedDataArray?.length || 0)) {
        setCurrentImageIndex(indexToCall);
      }
    },
    [
      notNestedDataArray?.length,
      currentImageIndex,
      pageSize,
      setSize,
      totalPages,
    ]
  );

  useEffect(() => {
    const showNextPage = async () => {
      if (
        isVisible &&
        !isLoading &&
        pageSize < totalPages &&
        breakpoint != null &&
        !(typeof data?.[pageSize - 1] === 'undefined')
      ) {
        await setSize(pageSize + 1);
      }
    };
    const timeout = setTimeout(showNextPage, 100);
    return () => clearTimeout(timeout);
  }, [breakpoint, data, isLoading, isVisible, pageSize, setSize, totalPages]);

  useEffect(() => {
    const runPreloadImages = async () => {
      const preloadPage = pageSize + 1;
      if (preloadPage <= totalPages) {
        const imagesToPreload = getItemsPerPage(
          photosId,
          pageSize,
          photosPerPage
        );
        const { mediaItems } = await preload(imagesToPreload, key =>
          MediaItemsService.getMediaItemsById(key)
        );
        setPreloadImages(mediaItems);
      }
    };
    runPreloadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return (
    <>
      {breakpoint ? (
        <div className="gallery-grid" data-testid="gallery-grid">
          <div className="flex mx-3 sm:gap-4 min-h-screen">
            {columns.map((column, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="grid-column | flex flex-col flex-1 gap-4"
              >
                {column.map(
                  image =>
                    image.sourceUrl && (
                      <GalleryImage
                        key={image.id}
                        src={image.sourceUrl}
                        alt={image.altText || ''}
                        width={image.mediaDetails?.width || 0}
                        height={image.mediaDetails?.height || 0}
                        sizes={imageSizes}
                        placeholder="blur"
                        blurDataURL="/blurImage.jpg"
                        className="cursor-pointer"
                        onClick={() => handleGalleryImageClick(image)}
                      />
                    )
                )}
              </div>
            ))}
          </div>
          {(data?.length || 0) < totalPages &&
            (isLoadingMore ? (
              <Spinner size="sm" className="mx-auto !block my-8" />
            ) : (
              <div className="mx-auto my-8 p-4" />
            ))}
          {(!isLoadingMore || columns.length > 0) && (
            <span ref={scrollRef} data-testid="observable-element" />
          )}
          <GalleryModal
            imageData={notNestedDataArray[currentImageIndex]}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onPrev={() => handlePrevNext('prev')}
            onNext={() => handlePrevNext('next')}
            loading={isLoadingMore && !notNestedDataArray[currentImageIndex]}
            hasPrev={currentImageIndex > 0}
            hasNext={currentImageIndex < (notNestedDataArray?.length || 0) - 1}
          />
        </div>
      ) : (
        <div className="spinner-wrapper | h-[calc(100vh-3rem)] w-full flex justify-center items-center">
          <Spinner size="md" />
        </div>
      )}
      <PreloadImages
        gridImages={preloadImages}
        imageSizes={imageSizes}
        notNestedDataArray={notNestedDataArray}
        currentImageIndex={currentImageIndex}
      />
    </>
  );
};

export default GalleryGrid;
