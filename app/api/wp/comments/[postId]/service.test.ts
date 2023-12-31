/* eslint-disable sonarjs/no-duplicate-string */
import { COMMENTS_BY_POST_ID } from '@app/graphql/comments';
import { getApolloClient } from '@app/utils/apollo-client';
import { Comment } from '@api/wp/comments/utils';
import { CommentStatusEnum } from '@app/graphql/__generated__/graphql';
import { ApolloQueryResult } from '@apollo/client/core/types';
import queryCommentsByPostId from './service';

jest.mock('@app/utils/apollo-client', () => ({
  getApolloClient: jest.fn(),
}));

describe('queryCommentsByPostId', () => {
  const MOCK_POST_ID = '123';

  const MOCK_COMMENTS: Comment[] = [
    {
      id: '1',
      databaseId: 1,
      content: 'Comment 1',
      date: '2021-01-01',
      parentId: '0',
      status: CommentStatusEnum.Approve,
      author: {
        name: 'Author 1',
        avatar: {
          url: 'https://www.example.com/avatar.jpg',
          width: 100,
          height: 100,
        },
      },
    },
    {
      id: '2',
      databaseId: 2,
      content: 'Comment 2',
      date: '2021-01-01',
      parentId: '0',
      status: CommentStatusEnum.Approve,
      author: {
        name: 'Author 1',
        avatar: {
          url: 'https://www.example.com/avatar.jpg',
          width: 100,
          height: 100,
        },
      },
    },
    {
      id: '3',
      databaseId: 3,
      content: 'Comment 3',
      date: '2021-01-01',
      parentId: '0',
      status: CommentStatusEnum.Approve,
      author: {
        name: 'Author 1',
        avatar: {
          url: 'https://www.example.com/avatar.jpg',
          width: 100,
          height: 100,
        },
      },
    },
  ];

  const MOCK_QUERY_DATA = {
    comments: {
      nodes: MOCK_COMMENTS.map(comment => ({
        ...comment,
        author: {
          node: comment.author,
        },
      })),
    },
  };

  const MOCK_QUERY_RESPONSE = {
    data: MOCK_QUERY_DATA,
    errors: [],
  } as unknown as ApolloQueryResult<typeof MOCK_QUERY_DATA>;

  const mockGetApolloClient = getApolloClient as jest.MockedFunction<
    typeof getApolloClient
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call apolloClient.query with the correct parameters', async () => {
    mockGetApolloClient.mockReturnValue({
      query: jest.fn().mockResolvedValue(MOCK_QUERY_RESPONSE),
    } as never);

    await queryCommentsByPostId(MOCK_POST_ID);

    expect(mockGetApolloClient).toHaveBeenCalled();
    expect(mockGetApolloClient().query).toHaveBeenCalledWith({
      query: COMMENTS_BY_POST_ID,
      variables: {
        contentId: MOCK_POST_ID,
      },
      fetchPolicy: 'no-cache',
    });
  });

  it('should return the comments data from the response', async () => {
    mockGetApolloClient.mockReturnValue({
      query: jest.fn().mockResolvedValue(MOCK_QUERY_RESPONSE),
    } as never);

    const result = await queryCommentsByPostId(MOCK_POST_ID);

    expect(result).toEqual({
      data: {
        comments: MOCK_COMMENTS,
      },
      errors: [],
    });
  });

  it('should throw an error if apolloClient.query fails', async () => {
    const errorMessage = 'Failed to query post data';
    mockGetApolloClient.mockReturnValue({
      query: jest.fn().mockRejectedValue(new Error(errorMessage)),
    } as never);

    await expect(queryCommentsByPostId(MOCK_POST_ID)).rejects.toThrow(
      errorMessage
    );
  });
});
