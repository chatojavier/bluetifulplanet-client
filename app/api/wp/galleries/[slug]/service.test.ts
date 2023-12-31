import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_GALLERY_BY_SLUG } from '@app/graphql/galleries';
import { QueryGalleryBySlugQuery } from '@app/graphql/__generated__/graphql';
import queryGalleryBySlug from './service';

jest.mock('@app/utils/apollo-client', () => ({
  getApolloClient: jest.fn(),
}));

describe('queryGalleryBySlug', () => {
  const MOCK_GALLERY_SLUG = 'example-slug';
  const MOCK_GALLERY_DATA: QueryGalleryBySlugQuery = {
    __typename: 'RootQuery',
    gallery: {
      __typename: 'Gallery',
      id: '123',
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
        title: 'Example Gallery',
        slug: MOCK_GALLERY_SLUG,
        status: 'publish',
        photosId: ['123', '456', '789'],
      },
    },
    errors: undefined,
  };

  const mockApolloClient = {
    query: jest.fn(),
  };

  const mockGetApolloClient = getApolloClient as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetApolloClient.mockReturnValue(mockApolloClient);
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockApolloClient.query.mockResolvedValue({ data: MOCK_GALLERY_DATA });

    await queryGalleryBySlug(MOCK_GALLERY_SLUG);

    expect(mockApolloClient.query).toHaveBeenCalledWith({
      query: QUERY_GALLERY_BY_SLUG,
      variables: {
        slug: MOCK_GALLERY_SLUG,
      },
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the mapped gallery data if it exists', async () => {
    mockApolloClient.query.mockResolvedValue({ data: MOCK_GALLERY_DATA });

    const result = await queryGalleryBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual(MOCK_GALLERY_RETURN);
  });

  it('should return null if the gallery data does not exist', async () => {
    mockApolloClient.query.mockResolvedValue({
      data: { gallery: null },
      errors: [{ message: 'Error' }],
    });

    const result = await queryGalleryBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual({
      data: { gallery: null },
      errors: [{ message: 'Error' }],
    });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query gallery data';
    mockApolloClient.query.mockRejectedValue(new Error(errorMessage));

    await expect(queryGalleryBySlug(MOCK_GALLERY_SLUG)).rejects.toThrow(
      errorMessage
    );
  });
});
