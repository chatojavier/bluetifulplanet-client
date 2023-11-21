'use client';

import Image from 'next/image';
import { FunctionComponent, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import useWindowSize from '@app/hooks/useWindowSize';
import { Breakpoint } from '@app/types/general';
import useOnScreen from '@app/hooks/useOnScreen';
import Spinner from '../Spinner/Spinner';
import { Image as ImageType, getItemsPerPage, concatColumns } from './utils';

type ImageResponse = {
  mediaItems: ImageType[];
};

interface GalleryGridProps {
  photosId: string[];
  photosPerPage?: number;
  fallback?: ImageResponse;
}

const fetcher = (key: string) =>
  fetch(key).then<ImageResponse>(res => res.json());

const GalleryGrid: FunctionComponent<GalleryGridProps> = ({
  photosId,
  photosPerPage = 15,
  fallback = { mediaItems: [] },
}) => {
  const { breakpoint } = useWindowSize();
  const totalPages = Math.ceil(photosId.length / photosPerPage);

  const {
    data,
    isLoading,
    size: pageSize,
    setSize,
  } = useSWRInfinite(
    index =>
      index < totalPages &&
      `/galleries/api?ids=${getItemsPerPage(photosId, index, photosPerPage)}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      revalidateFirstPage: false,
      revalidateAll: false,
      revalidateIfStale: false,
    }
  );

  const [scrollRef, isVisible] = useOnScreen({
    threshold: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (
        isVisible &&
        !isLoading &&
        pageSize < totalPages &&
        breakpoint &&
        !(typeof data?.[pageSize - 1] === 'undefined')
      ) {
        await setSize(pageSize + 1);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [breakpoint, data, isLoading, isVisible, pageSize, setSize, totalPages]);

  const columns = useMemo(() => {
    const numColumns = {
      [Breakpoint.XS]: 1,
      [Breakpoint.SM]: 2,
      [Breakpoint.MD]: 2,
      [Breakpoint.LG]: 3,
      [Breakpoint.XL]: 4,
      [Breakpoint.XXL]: 4,
    };

    return breakpoint
      ? concatColumns(data || [fallback], numColumns[breakpoint])
      : [];
  }, [breakpoint, data, fallback]);

  const isLoadingMore =
    isLoading ||
    (pageSize > 0 && data && typeof data[pageSize - 1] === 'undefined');

  return (
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
                  <div
                    key={image.id}
                    className="grid-row | relative w-full overflow-hidden h-auto"
                  >
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText || ''}
                      width={image.mediaDetails?.width || 0}
                      height={image.mediaDetails?.height || 0}
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33.33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL="/blurImage.jpg"
                      className="object-cover w-full h-full"
                    />
                  </div>
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
      {(!isLoadingMore || breakpoint || columns.length > 0) && (
        <span ref={scrollRef} />
      )}
    </div>
  );
};

export default GalleryGrid;
