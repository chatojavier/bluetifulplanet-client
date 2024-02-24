import { QueryMediaTagBySlugQuery } from '@app/graphql/__generated__/graphql';
import { QUERY_MEDIA_TAG_BY_SLUG } from '@app/graphql/taxonomies';
import fetchGraphql from '@app/utils/fetchGraphql';
import { GraphQLError } from 'graphql';
import queryMediaTagBySlug from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryMediaTagBySlug', () => {
  const MOCK_GALLERY_SLUG = 'example-slug';
  const MOCK_GALLERY_DATA: QueryMediaTagBySlugQuery = {
    __typename: 'RootQuery',
    mediaTag: {
      __typename: 'MediaTag',
      id: '123',
      name: 'Example Gallery',
      slug: MOCK_GALLERY_SLUG,
      mediaItems: {
        __typename: 'MediaTagToMediaItemConnection',
        nodes: [
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
      mediaTag: {
        id: '123',
        name: 'Example Gallery',
        slug: MOCK_GALLERY_SLUG,
        photosId: ['123', '456', '789'],
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

    await queryMediaTagBySlug(MOCK_GALLERY_SLUG);

    expect(mockFetchGraphql).toHaveBeenCalledWith(QUERY_MEDIA_TAG_BY_SLUG, {
      slug: MOCK_GALLERY_SLUG,
    });
  });

  it('should return the mapped gallery data if it exists', async () => {
    mockFetchGraphql.mockResolvedValue({ data: MOCK_GALLERY_DATA });

    const result = await queryMediaTagBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual(MOCK_GALLERY_RETURN);
  });

  it('should return null if the gallery data does not exist', async () => {
    mockFetchGraphql.mockResolvedValue({
      data: { gallery: null },
      errors: [{ message: 'Error' } as GraphQLError],
    });

    const result = await queryMediaTagBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual({
      data: { mediaTag: null },
      errors: [{ message: 'Error' }],
    });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query gallery data';
    mockFetchGraphql.mockRejectedValue(new Error(errorMessage));

    await expect(queryMediaTagBySlug(MOCK_GALLERY_SLUG)).rejects.toThrow(
      errorMessage
    );
  });
});
