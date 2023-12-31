import Image from 'next/image';
import {
  ComponentProps,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import ImageZoom from '../Icons/ImageZoom';

type GalleryImageProps = ComponentProps<typeof Image>;

const GalleryImage: FunctionComponent<GalleryImageProps> = ({
  className = '',
  onClick,
  ...rest
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && onClick) {
      onClick(event as unknown as MouseEvent<HTMLImageElement>);
    }
  };
  return (
    <div
      className="grid-row | relative w-full overflow-hidden h-auto bg-black | group"
      data-testid="gallery-image"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <Image
        className={`object-cover w-full h-full  | transition-all duration-1000 | group-hover:scale-105 group-hover:opacity-80 ${className}`}
        {...rest}
      />
      <ImageZoom className="absolute top-0 right-0 m-5 fill-white | scale-0 transition-transform duration-500 cursor-pointer | group-hover:scale-100" />
    </div>
  );
};

export default GalleryImage;
