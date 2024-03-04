import NextImage from 'next/image';
import { MediaItem } from '@app/api/wp/media-items/utils';
import { FC } from 'react';

interface PreloadImagesProps {
  gridImages: MediaItem[];
  imageSizes: string;
  notNestedDataArray: MediaItem[];
  currentImageIndex: number;
}

const PreloadImages: FC<PreloadImagesProps> = ({
  gridImages,
  imageSizes,
  notNestedDataArray,
  currentImageIndex,
}) => (
  <div className="preload-images | hidden">
    {gridImages.map(image =>
      image.sourceUrl ? (
        <NextImage
          key={`grid-${image.id}`}
          src={image.sourceUrl}
          alt={image.altText || ''}
          width={image.mediaDetails?.width || 0}
          height={image.mediaDetails?.height || 0}
          sizes={imageSizes}
          priority
        />
      ) : null
    )}
    {currentImageIndex &&
      [
        notNestedDataArray[(currentImageIndex || 1) - 1],
        notNestedDataArray[(currentImageIndex || -1) + 1],
      ].map(image =>
        image?.sourceUrl ? (
          <NextImage
            key={`modal-${image.id}`}
            src={image.sourceUrl}
            alt={image.altText || ''}
            width={image.mediaDetails?.width || 0}
            height={image.mediaDetails?.height || 0}
            priority
          />
        ) : null
      )}
  </div>
);

export default PreloadImages;
