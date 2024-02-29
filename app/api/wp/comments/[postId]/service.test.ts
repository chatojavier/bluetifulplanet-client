/* eslint-disable sonarjs/no-duplicate-string */
import { COMMENTS_BY_POST_ID } from '@app/graphql/comments';
import { Comment } from '@api/wp/comments/utils';
import { CommentStatusEnum } from '@app/graphql/__generated__/graphql';
import fetchGraphql from '@app/utils/fetchGraphql';
import { ApiWpReturn } from '@app/api/api.types';
import queryCommentsByPostId from './service';

jest.mock('@app/utils/fetchGraphql', () => ({
  __esModule: true,
  default: jest.fn(),
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
    commentCount: 0,
  };

  const MOCK_QUERY_RESPONSE = {
    data: MOCK_QUERY_DATA,
    errors: [],
  } as ApiWpReturn<typeof MOCK_QUERY_DATA>;

  const mockFetchGraphql = fetchGraphql as jest.MockedFunction<
    typeof fetchGraphql
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetchGraphql with the correct parameters', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_QUERY_RESPONSE);

    await queryCommentsByPostId(MOCK_POST_ID);

    expect(mockFetchGraphql).toHaveBeenCalledWith(
      COMMENTS_BY_POST_ID,
      {
        contentId: MOCK_POST_ID,
        offsetPagination: {
          offset: 0,
          size: 10,
        },
      },
      { cache: 'no-store' }
    );
  });

  it('should return the comments data from the response', async () => {
    mockFetchGraphql.mockResolvedValue(MOCK_QUERY_RESPONSE);

    const result = await queryCommentsByPostId(MOCK_POST_ID);

    expect(result).toEqual({
      data: {
        comments: MOCK_COMMENTS,
        commentCount: 0,
      },
      errors: [],
    });
  });

  it('should throw an error if fetchGraphql fails', async () => {
    const errorMessage = 'Failed to query post data';
    mockFetchGraphql.mockRejectedValue(new Error(errorMessage));

    await expect(queryCommentsByPostId(MOCK_POST_ID)).rejects.toThrow(
      errorMessage
    );
  });
});
