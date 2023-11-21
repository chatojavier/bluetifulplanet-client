import { organizeImages, Image, concatColumns } from './utils';

describe('organizeImages', () => {
  it('should return an empty array if not all images have height', () => {
    const images = [
      { id: 1, mediaDetails: { height: 100, width: 80 } },
      { id: 2, mediaDetails: { height: undefined, width: 80 } },
      { id: 3, mediaDetails: { height: 200, width: 80 } },
    ] as unknown as Image[];
    const numColumns = 3;

    const result = organizeImages(images, numColumns);

    expect(result).toEqual([]);
  });

  it('should organize images into columns based on height', () => {
    const images = [
      { id: 1, mediaDetails: { height: 100, width: 80 } },
      { id: 2, mediaDetails: { height: 200, width: 80 } },
      { id: 3, mediaDetails: { height: 150, width: 80 } },
      { id: 4, mediaDetails: { height: 250, width: 80 } },
      { id: 5, mediaDetails: { height: 180, width: 80 } },
    ] as unknown as Image[];
    const numColumns = 3;

    const result = organizeImages(images, numColumns);

    expect(result).toEqual([
      [
        { id: 1, mediaDetails: { height: 100, width: 80 } },
        { id: 2, mediaDetails: { height: 200, width: 80 } },
      ],
      [
        { id: 3, mediaDetails: { height: 150, width: 80 } },
        { id: 5, mediaDetails: { height: 180, width: 80 } },
      ],
      [{ id: 4, mediaDetails: { height: 250, width: 80 } }],
    ]);
  });

  it('should handle empty images array', () => {
    const images: Image[] = [];
    const numColumns = 3;

    const result = organizeImages(images, numColumns);

    expect(result).toEqual([[], [], []]);
  });
});
describe('concatColumns', () => {
  it('should return an empty array if data is undefined', () => {
    const data: { mediaItems: Image[] }[] | undefined = undefined;
    const numColumns = 3;

    const result = concatColumns(data, numColumns);

    expect(result).toEqual([]);
  });

  it('should return an empty array if data is an empty array', () => {
    const data: { mediaItems: Image[] }[] = [];
    const numColumns = 3;

    const result = concatColumns(data, numColumns);

    expect(result).toEqual([]);
  });

  it('should return an empty array if mediaItems is undefined', () => {
    const data = [
      { mediaItems: undefined },
      { mediaItems: undefined },
    ] as unknown as { mediaItems: Image[] }[];
    const numColumns = 3;

    const result = concatColumns(data, numColumns);

    expect(result).toEqual([]);
  });

  it('should concatenate columns correctly', () => {
    const data = [
      {
        mediaItems: [
          { id: 1, mediaDetails: { height: 100, width: 80 } },
          { id: 2, mediaDetails: { height: 200, width: 80 } },
          { id: 3, mediaDetails: { height: 150, width: 80 } },
        ],
      },
      {
        mediaItems: [
          { id: 4, mediaDetails: { height: 250, width: 80 } },
          { id: 5, mediaDetails: { height: 180, width: 80 } },
        ],
      },
    ] as unknown as { mediaItems: Image[] }[];
    const numColumns = 3;

    const result = concatColumns(data, numColumns);

    expect(result).toEqual([
      [
        { id: 1, mediaDetails: { height: 100, width: 80 } },
        { id: 4, mediaDetails: { height: 250, width: 80 } },
      ],
      [{ id: 2, mediaDetails: { height: 200, width: 80 } }],
      [
        { id: 3, mediaDetails: { height: 150, width: 80 } },
        { id: 5, mediaDetails: { height: 180, width: 80 } },
      ],
    ]);
  });
});
