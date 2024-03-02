import { QUERY_GALLERY_BY_SLUG } from '@app/graphql/galleries';
import { QueryGalleryBySlugQuery } from '@app/graphql/__generated__/graphql';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import queryGalleryBySlug from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryGalleryBySlug', () => {
  const MOCK_GALLERY_SLUG = 'example-slug';
  const MOCK_GALLERY_DATA: QueryGalleryBySlugQuery = {
    __typename: 'RootQuery',
    gallery: {
      __typename: 'Gallery',
      id: '123',
      databaseId: 123,
      title: 'Example Gallery',
      slug: MOCK_GALLERY_SLUG,
      status: 'publish',
      gallerySettings: {
        __typename: 'Gallery_Gallerysettings',
        galleryPhotos: [
          {
            __typename: 'MediaItem',
            databaseId: 123,
          },
          {
            __typename: 'MediaItem',
            databaseId: 456,
          },
          {
            __typename: 'MediaItem',
            databaseId: 789,
          },
        ],
      },
    },
  };
  const MOCK_GALLERY_RETURN = {
    data: {
      gallery: {
        id: '123',
        databaseId: 123,
        title: 'Example Gallery',
        slug: MOCK_GALLERY_SLUG,
        status: 'publish',
        photosId: ['123', '456', '789'],
        comments: [],
      },
    },
    errors: undefined,
  };

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue({ data: MOCK_GALLERY_DATA });

    await queryGalleryBySlug(MOCK_GALLERY_SLUG);

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_GALLERY_BY_SLUG, {
      slug: MOCK_GALLERY_SLUG,
    });
  });

  it('should return the mapped gallery data if it exists', async () => {
    mockFetchGraphql.mockResolvedValue({ data: MOCK_GALLERY_DATA });

    const result = await queryGalleryBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual(MOCK_GALLERY_RETURN);
  });

  it('should return null if the gallery data does not exist', async () => {
    mockFetchGraphql.mockResolvedValue({
      data: { gallery: null },
      errors: [{ message: 'Error' }] as unknown as GraphQLError[],
    });

    const result = await queryGalleryBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual({
      data: { gallery: null },
      errors: [{ message: 'Error' }],
    });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query gallery data';
    mockFetchGraphql.mockRejectedValue(new Error(errorMessage));

    await expect(queryGalleryBySlug(MOCK_GALLERY_SLUG)).rejects.toThrow(
      errorMessage
    );
  });
});
