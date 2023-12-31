/* eslint-disable sonarjs/no-duplicate-string */
import queryCommentsByPostId from '@app/api/wp/comments/[postId]/service';
import { isBrowser } from '@app/utils/general';
import { Comment } from '@api/wp/comments/utils';
import { CommentStatusEnum } from '@app/graphql/__generated__/graphql';
import fetchData from '@app/utils/fetchData';
import mutatePostComment from '@app/api/wp/comments/service';
import CommentsService from './commentsService';

jest.mock('@app/api/wp/comments/[postId]/service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@api/wp/comments/service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@app/utils/fetchData', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('@app/utils/general', () => ({
  __esModule: true,
  isBrowser: jest.fn(),
}));

const mockIsBrowser = isBrowser as jest.Mock;
const mockQueryMediaItemsById = queryCommentsByPostId as jest.Mock;
const mockMutatePostComment = mutatePostComment as jest.Mock;

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
const MOCK_COMMENTS_RESPONSE = {
  data: MOCK_COMMENTS,
  errors: null,
};
const MOCK_COMMENTS_ERROR = 'MOCK_COMMENTS_ERROR';

describe('CommentsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCommentsByPostId', () => {
    it('should call queryCommentsByPostId with the correct parameters', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockQueryMediaItemsById.mockResolvedValue(MOCK_COMMENTS_RESPONSE);

      await CommentsService.getCommentsByPostId(MOCK_POST_ID);

      expect(mockQueryMediaItemsById).toHaveBeenCalledWith(MOCK_POST_ID);
    });

    it('should throw an error if response contains errors', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockQueryMediaItemsById.mockResolvedValue({
        ...MOCK_COMMENTS_RESPONSE,
        errors: [{ message: MOCK_COMMENTS_ERROR }],
      });

      const promiseResult = CommentsService.getCommentsByPostId(MOCK_POST_ID);

      expect(promiseResult).rejects.toThrowError(MOCK_COMMENTS_ERROR);
    });

    it('should call fetchData.get with the correct parameters', async () => {
      mockIsBrowser.mockReturnValue(true);
      (fetchData.get as jest.Mock).mockResolvedValue(MOCK_COMMENTS_RESPONSE);

      await CommentsService.getCommentsByPostId(MOCK_POST_ID);

      expect(fetchData.get).toHaveBeenCalledWith(
        `/api/wp/comments/${MOCK_POST_ID}`
      );
    });

    it('should return the correct data', async () => {
      mockIsBrowser.mockReturnValue(true);
      (fetchData.get as jest.Mock).mockResolvedValue(MOCK_COMMENTS_RESPONSE);

      const result = await CommentsService.getCommentsByPostId(MOCK_POST_ID);

      expect(result).toEqual(MOCK_COMMENTS_RESPONSE);
    });

    it('should return the correct error', async () => {
      mockIsBrowser.mockReturnValue(true);
      (fetchData.get as jest.Mock).mockRejectedValue(
        new Error(MOCK_COMMENTS_ERROR)
      );

      const promiseResult = CommentsService.getCommentsByPostId(MOCK_POST_ID);

      expect(promiseResult).rejects.toThrowError(MOCK_COMMENTS_ERROR);
    });
  });

  describe('postCommentForm', () => {
    const MOCK_COMMENT_FORM = {
      author: 'John Doe',
      authorEmail: 'john.doe@email.com',
      authorUrl: 'https://www.example.com',
      content: 'Comment',
    };
    const MOCK_COMMENT_FORM_PAYLOAD = {
      commentFields: MOCK_COMMENT_FORM,
      parent: undefined,
      postId: '123',
    };

    const MOCK_CREATED_COMMENT = {
      id: '123',
      databaseId: 123,
      content: 'Comment',
      date: '2021-01-01',
      parentId: '0',
      status: CommentStatusEnum.Approve,
    };

    const MOCK_CREATED_COMMENT_RESPONSE = {
      data: {
        createdComment: MOCK_CREATED_COMMENT,
      },
      errors: null,
    };

    it('should call fetchData.post with the correct parameters', async () => {
      (fetchData.post as jest.Mock).mockResolvedValue(
        MOCK_CREATED_COMMENT_RESPONSE
      );

      await CommentsService.postCommentForm('123', MOCK_COMMENT_FORM);

      expect(fetchData.post).toHaveBeenCalledWith(
        '/api/wp/comments',
        MOCK_COMMENT_FORM_PAYLOAD
      );
    });

    it('should return the correct data', async () => {
      (fetchData.post as jest.Mock).mockResolvedValue(
        MOCK_CREATED_COMMENT_RESPONSE
      );

      const result = await CommentsService.postCommentForm(
        '123',
        MOCK_COMMENT_FORM
      );

      expect(result).toEqual(MOCK_CREATED_COMMENT_RESPONSE);
    });

    it('should return the correct error', async () => {
      (fetchData.post as jest.Mock).mockRejectedValue(
        new Error(MOCK_COMMENTS_ERROR)
      );

      const promiseResult = CommentsService.postCommentForm(
        '123',
        MOCK_COMMENT_FORM
      );

      expect(promiseResult).rejects.toThrowError(MOCK_COMMENTS_ERROR);
    });

    it('should call mutatePostComment with the correct parameters', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockMutatePostComment.mockResolvedValue(MOCK_CREATED_COMMENT_RESPONSE);

      await CommentsService.postCommentForm('123', MOCK_COMMENT_FORM);

      expect(mockMutatePostComment).toHaveBeenCalledWith(
        MOCK_COMMENT_FORM_PAYLOAD
      );
    });

    it('should return the correct data', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockMutatePostComment.mockResolvedValue(MOCK_CREATED_COMMENT_RESPONSE);

      const result = await CommentsService.postCommentForm(
        '123',
        MOCK_COMMENT_FORM
      );

      expect(result).toEqual({ createdComment: MOCK_CREATED_COMMENT });
    });

    it('should return the correct error', async () => {
      mockIsBrowser.mockReturnValue(false);
      mockMutatePostComment.mockResolvedValue({
        data: null,
        errors: [{ message: MOCK_COMMENTS_ERROR }],
      });

      const promiseResult = CommentsService.postCommentForm(
        '123',
        MOCK_COMMENT_FORM
      );

      expect(promiseResult).rejects.toThrowError(MOCK_COMMENTS_ERROR);
    });
  });
});
