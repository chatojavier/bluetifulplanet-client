/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/prop-types */
/* eslint-disable @next/next/no-img-element */
import { render } from '@testing-library/react';
import { MediaItem } from '@app/api/wp/media-items/utils';
import PreloadImages from './PreloadImages';

jest.mock(
  'next/image',
  () =>
    ({
      src,
      alt,
      width,
      height,
      sizes,
      priority,
    }: {
      src: string;
      alt: string;
      width: number;
      height: number;
      sizes: string;
      priority: boolean;
    }) =>
      (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
        />
      )
);

describe('PreloadImages', () => {
  const gridImages = [
    {
      id: 1,
      sourceUrl: 'https://example.com/image1.jpg',
      altText: 'Image 1',
      mediaDetails: {
        width: 100,
        height: 100,
      },
    },
    {
      id: 2,
      sourceUrl: 'https://example.com/image2.jpg',
      altText: 'Image 2',
      mediaDetails: {
        width: 200,
        height: 200,
      },
    },
    {
      id: 3,
      sourceUrl: 'https://example.com/image3.jpg',
      altText: 'Image 3',
      mediaDetails: {
        width: 300,
        height: 300,
      },
    },
  ] as unknown as MediaItem[];

  const imageSizes = '100vw';
  const notNestedDataArray = gridImages;
  const currentImageIndex = 1;

  it('should render the correct number of images', () => {
    const { getAllByRole } = render(
      <PreloadImages
        gridImages={gridImages}
        imageSizes={imageSizes}
        notNestedDataArray={notNestedDataArray}
        currentImageIndex={currentImageIndex}
      />
    );

    const images = getAllByRole('img');
    expect(images).toHaveLength(5); // 3 gridImages + 2 next and prev images
  });

  it('should render the images with the correct attributes', () => {
    const { getAllByRole } = render(
      <PreloadImages
        gridImages={gridImages}
        imageSizes={imageSizes}
        notNestedDataArray={notNestedDataArray}
        currentImageIndex={currentImageIndex}
      />
    );

    const images = getAllByRole('img');

    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Image 1');
    expect(images[0]).toHaveAttribute('width', '100');
    expect(images[0]).toHaveAttribute('height', '100');

    expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Image 2');
    expect(images[1]).toHaveAttribute('width', '200');
    expect(images[1]).toHaveAttribute('height', '200');

    expect(images[2]).toHaveAttribute('src', 'https://example.com/image3.jpg');
    expect(images[2]).toHaveAttribute('alt', 'Image 3');
    expect(images[2]).toHaveAttribute('width', '300');
    expect(images[2]).toHaveAttribute('height', '300');

    expect(images[3]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(images[3]).toHaveAttribute('alt', 'Image 1');
    expect(images[3]).toHaveAttribute('width', '100');
    expect(images[3]).toHaveAttribute('height', '100');

    expect(images[4]).toHaveAttribute('src', 'https://example.com/image3.jpg');
    expect(images[4]).toHaveAttribute('alt', 'Image 3');
    expect(images[4]).toHaveAttribute('width', '300');
    expect(images[4]).toHaveAttribute('height', '300');
  });
});
