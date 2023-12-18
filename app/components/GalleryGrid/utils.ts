import { MediaItemComplete } from '@app/apollo/MediaItemsService';

type FictionalImg = {
  id: string;
  height: number;
  index: number;
};

const createFictionalHeightArray = (
  images: MediaItemComplete[]
): FictionalImg[] => {
  const fictionalWidth = Math.max(
    ...images.map(img => img.mediaDetails?.width as number)
  );

  return images.map((img, index) => ({
    id: img.id,
    height:
      ((img.mediaDetails?.height as number) /
        (img.mediaDetails?.width as number)) *
      fictionalWidth,
    index,
  }));
};

export function organizeImages(
  images: MediaItemComplete[],
  numColumns: number
): MediaItemComplete[][] {
  const areAllHaveHeight = images.every(image => image.mediaDetails?.height);
  if (!areAllHaveHeight) {
    return [];
  }

  const fictionalHeightArray = createFictionalHeightArray(images);

  const sortedFictionalHeightArray = [...fictionalHeightArray].sort(
    (a, b) => b.height - a.height
  );

  const columns: FictionalImg[][] = Array.from(
    { length: numColumns },
    () => []
  );

  const getColumnFictionalHeight = (column: FictionalImg[]) =>
    column.reduce((sum, img) => sum + img.height, 0);

  for (let i = 0; i < sortedFictionalHeightArray.length; i += 1) {
    const minColumn = columns.reduce(
      (min, column) =>
        getColumnFictionalHeight(column) < getColumnFictionalHeight(min)
          ? column
          : min,
      columns[0]
    );

    minColumn.push(sortedFictionalHeightArray[i]);
  }

  const sortedColumns = columns
    .map(column => column.sort((a, b) => a.index - b.index))
    .sort((a, b) => {
      if (a.length === 0) {
        return 1;
      }
      if (b.length === 0) {
        return -1;
      }
      return a[0].index - b[0].index;
    });

  return sortedColumns.map(column =>
    column.map(
      item => images.find(img => img.id === item.id) as MediaItemComplete
    )
  );
}

const getColumnHeight = (column: MediaItemComplete[]) => {
  const fictionalWidth = 1000;
  return column.reduce(
    (height, image) =>
      height +
      ((image.mediaDetails?.height || 0) * fictionalWidth) /
        (image.mediaDetails?.width || 0),
    0
  );
};

export const concatColumns = (
  data:
    | {
        mediaItems: MediaItemComplete[];
      }[]
    | undefined,
  numColumns: number
) => {
  if (!data || data.length === 0) {
    return [];
  }
  return data.reduce((acc, curr) => {
    if (!curr.mediaItems) {
      return acc;
    }
    const organizedImages = organizeImages(curr.mediaItems, numColumns);

    if (acc.length === 0) {
      return organizedImages;
    }

    // Initialize arrays to keep track of heights for each set of columns
    const accHeights = acc.map(column => getColumnHeight(column));

    const organizedHeights = organizedImages.map(column =>
      getColumnHeight(column)
    );

    while (organizedImages.length > 0) {
      // Find the index of the column with the highest height in acc
      const highestAccColumnIndex = accHeights.indexOf(Math.max(...accHeights));

      // Find the index of the column with the shortest height in organizedImages
      const shortestOrganizedColumnIndex = organizedHeights.indexOf(
        Math.min(...organizedHeights)
      );

      // Concatenate the images from the shortest column in organizeImages to the highest column in acc
      acc[highestAccColumnIndex] = [
        ...acc[highestAccColumnIndex],
        ...organizedImages[shortestOrganizedColumnIndex],
      ];

      // Update height for the acc column
      accHeights[highestAccColumnIndex] = 0;

      // Remove the used column from organizedImages
      organizedImages.splice(shortestOrganizedColumnIndex, 1);
      // Remove the corresponding height entry for the used column
      organizedHeights.splice(shortestOrganizedColumnIndex, 1);
    }

    return acc;
  }, [] as MediaItemComplete[][]);
};

export const getItemsPerPage = (
  items: unknown[],
  page: number,
  photosPerPage: number
) => {
  const start = page * photosPerPage;
  const end = start + photosPerPage;
  return items.slice(start, end);
};

export const concatNestedArray = <T>(arrays: T[][]) => {
  const result = [];
  const maxLength = Math.max(...arrays.map(arr => arr.length));

  for (let i = 0; i < maxLength; i += 1) {
    for (let j = 0; j < arrays.length; j += 1) {
      if (arrays[j][i] !== undefined) {
        result.push(arrays[j][i]);
      }
    }
  }

  return result;
};
