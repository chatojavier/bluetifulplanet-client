'use client';

import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import '@swiper/swiper.min.css';
import '@swiper/modules/autoplay/autoplay.min.css';
import '@swiper/modules/navigation/navigation.min.css';
import FullSliderNavigation from './FullSliderNavigation';

export type ImageGallery = ({
  sourceUrl: string | null | undefined;
  id: string;
  altText: string | null | undefined;
  mediaDetails:
    | {
        width: number | null | undefined;
        height: number | null | undefined;
      }
    | null
    | undefined;
} | null)[];

type FullSliderProps = {
  gallery: ImageGallery;
};

const FullSlider: FunctionComponent<FullSliderProps> = ({ gallery }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ disableOnInteraction: false }}
      loop
      speed={1000}
      className="h-full relative"
    >
      {gallery.map(imageObj => {
        const { id, sourceUrl, altText, mediaDetails } = imageObj || {};
        if (!sourceUrl) return null;
        return (
          <SwiperSlide key={id}>
            <Image
              src={sourceUrl}
              alt={altText ?? ''}
              width={mediaDetails?.width || undefined}
              height={mediaDetails?.height || undefined}
              sizes="100vw"
              className="h-full object-cover"
              placeholder="blur"
              blurDataURL="/blurImage.jpg"
              fill={!mediaDetails?.width}
            />
          </SwiperSlide>
        );
      })}
      <FullSliderNavigation />
    </Swiper>
  );
};

export default FullSlider;
