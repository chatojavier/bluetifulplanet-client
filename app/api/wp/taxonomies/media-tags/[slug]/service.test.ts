import { QueryMediaTagBySlugQuery } from '@app/graphql/__generated__/graphql';
import { getApolloClient } from '@app/utils/apollo-client';
import { QUERY_MEDIA_TAG_BY_SLUG } from '@app/graphql/taxonomies';
import queryMediaTagBySlug from './service';

jest.mock('@app/utils/apollo-client', () => ({
  getApolloClient: jest.fn(),
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

    await queryMediaTagBySlug(MOCK_GALLERY_SLUG);

    expect(mockApolloClient.query).toHaveBeenCalledWith({
      query: QUERY_MEDIA_TAG_BY_SLUG,
      variables: {
        slug: MOCK_GALLERY_SLUG,
      },
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the mapped gallery data if it exists', async () => {
    mockApolloClient.query.mockResolvedValue({ data: MOCK_GALLERY_DATA });

    const result = await queryMediaTagBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual(MOCK_GALLERY_RETURN);
  });

  it('should return null if the gallery data does not exist', async () => {
    mockApolloClient.query.mockResolvedValue({
      data: { gallery: null },
      errors: [{ message: 'Error' }],
    });

    const result = await queryMediaTagBySlug(MOCK_GALLERY_SLUG);

    expect(result).toEqual({
      data: { mediaTag: null },
      errors: [{ message: 'Error' }],
    });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query gallery data';
    mockApolloClient.query.mockRejectedValue(new Error(errorMessage));

    await expect(queryMediaTagBySlug(MOCK_GALLERY_SLUG)).rejects.toThrow(
      errorMessage
    );
  });
});
