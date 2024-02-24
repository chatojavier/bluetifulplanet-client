import { CREATE_COMMENT } from '@app/graphql/comments';
import fetchGraphql from '@app/utils/fetchGraphql';
import { ApiWpReturn } from '@app/api/api.types';
import mutatePostComment from './service';
import { mapCommentData } from './utils';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./utils', () => ({
  mapCommentData: jest.fn(),
}));

describe('mutatePostComment', () => {
  const MOCK_POST_ID = '123';
  const MOCK_COMMENT_FIELDS = {
    author: 'John Doe',
    authorEmail: 'john.doe@example.com',
    authorUrl: 'https://example.com',
    content: 'This is a comment',
  };
  const MOCK_PARENT = '456';

  const MOCK_QUERY_DATA = {
    createComment: {
      comment: {
        id: '789',
        // ... other comment properties
      },
    },
  };

  const MOCK_RESPONSE = {
    data: MOCK_QUERY_DATA,
    errors: null,
  } as unknown as ApiWpReturn<typeof MOCK_QUERY_DATA>;

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;
  const mockMapCommentData = mapCommentData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the Apollo client query with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_RESPONSE);

    await mutatePostComment({
      postId: MOCK_POST_ID,
      commentFields: MOCK_COMMENT_FIELDS,
      parent: MOCK_PARENT,
    });

    expect(mockFetchGraphql).toHaveBeenCalledWith(CREATE_COMMENT, {
      commentOn: Number(MOCK_POST_ID),
      author: MOCK_COMMENT_FIELDS.author,
      authorEmail: MOCK_COMMENT_FIELDS.authorEmail,
      authorUrl: MOCK_COMMENT_FIELDS.authorUrl,
      content: MOCK_COMMENT_FIELDS.content,
      parent: MOCK_PARENT,
      clientMutationId: `createCommentOn${MOCK_POST_ID}`,
    });
  });

  it('should return the created comment if the query is successful', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_RESPONSE);
    mockMapCommentData.mockReturnValue({
      id: '789',
      // ... other comment properties
    });

    const result = await mutatePostComment({
      postId: MOCK_POST_ID,
      commentFields: MOCK_COMMENT_FIELDS,
      parent: MOCK_PARENT,
    });

    expect(result).toEqual({
      data: {
        createdComment: {
          id: '789',
          // ... other comment properties
        },
      },
      errors: null,
    });
  });

  it('should throw an error if the query fails', async () => {
    mockFetchGraphql.mockRejectedValue(new Error('Query failed'));

    await expect(
      mutatePostComment({
        postId: MOCK_POST_ID,
        commentFields: MOCK_COMMENT_FIELDS,
        parent: MOCK_PARENT,
      })
    ).rejects.toThrow('Query failed');
  });
});
