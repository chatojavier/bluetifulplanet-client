import { getApolloClient } from '@app/utils/apollo-client';
import { CREATE_COMMENT } from '@app/graphql/comments';
import mutatePostComment from './service';
import { mapCommentData } from './utils';

jest.mock('@app/utils/apollo-client', () => ({
  getApolloClient: jest.fn(),
}));

jest.mock('@app/graphql/comments', () => ({
  CREATE_COMMENT: jest.fn(),
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

  const MOCK_RESPONSE = {
    data: {
      createComment: {
        comment: {
          id: '789',
          // ... other comment properties
        },
      },
    },
    errors: null,
  };

  const mockGetApolloClient = getApolloClient as jest.Mock;
  const mockMapCommentData = mapCommentData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the Apollo client query with the correct parameters', async () => {
    const apolloClientMock = {
      query: jest.fn().mockResolvedValue(MOCK_RESPONSE),
    };
    mockGetApolloClient.mockReturnValue(apolloClientMock);

    await mutatePostComment({
      postId: MOCK_POST_ID,
      commentFields: MOCK_COMMENT_FIELDS,
      parent: MOCK_PARENT,
    });

    expect(apolloClientMock.query).toHaveBeenCalledWith({
      query: CREATE_COMMENT,
      variables: {
        commentOn: Number(MOCK_POST_ID),
        author: MOCK_COMMENT_FIELDS.author,
        authorEmail: MOCK_COMMENT_FIELDS.authorEmail,
        authorUrl: MOCK_COMMENT_FIELDS.authorUrl,
        content: MOCK_COMMENT_FIELDS.content,
        parent: MOCK_PARENT,
        clientMutationId: `createCommentOn${MOCK_POST_ID}`,
      },
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the created comment if the query is successful', async () => {
    const apolloClientMock = {
      query: jest.fn().mockResolvedValue(MOCK_RESPONSE),
    };
    mockGetApolloClient.mockReturnValue(apolloClientMock);
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
    const apolloClientMock = {
      query: jest.fn().mockRejectedValue(new Error('Query failed')),
    };
    mockGetApolloClient.mockReturnValue(apolloClientMock);

    await expect(
      mutatePostComment({
        postId: MOCK_POST_ID,
        commentFields: MOCK_COMMENT_FIELDS,
        parent: MOCK_PARENT,
      })
    ).rejects.toThrow('Query failed');
  });
});
