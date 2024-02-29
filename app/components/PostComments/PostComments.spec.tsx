/* eslint-disable sonarjs/no-duplicate-string */
import { render, screen } from '@testing-library/react';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import { Comment } from '@app/api/wp/comments/utils';
import { CommentStatusEnum } from '@app/graphql/__generated__/graphql';
import CommentsService from '@app/services/commentsService';
import userEvent from '@testing-library/user-event';
import PostComments from './PostComments';

jest.mock('swr/infinite', () => {
  const currentModule = jest.requireActual('swr/infinite');
  return {
    ...currentModule,
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('@app/services/commentsService', () => {
  const currentModule = jest.requireActual('@app/services/commentsService');
  return {
    ...currentModule,
    __esModule: true,
    default: {
      getCommentsByPostId: jest.fn(),
      postCommentForm: jest.fn(),
    },
  };
});

const mockComments: Comment[] = [
  {
    id: 'mock-comment-id-000',
    databaseId: 0,
    status: CommentStatusEnum.Approve,
    author: {
      name: 'Parent Author Name',
      avatar: {
        url: 'https://www.example-parent.com/avatar.jpg',
        width: 100,
        height: 100,
      },
    },
    content: 'Sample Parent comment content',
    date: '2021-01-01T00:00:00',
    parentId: null,
  },
  {
    id: 'mock-comment-id-001',
    databaseId: 1,
    status: CommentStatusEnum.Approve,
    author: {
      name: 'Child Author Name',
      avatar: {
        url: 'https://www.example-child.com/avatar.jpg',
        width: 100,
        height: 100,
      },
    },
    content: 'Sample Child comment content',
    date: '2021-01-02T00:00:00',
    parentId: 'mock-comment-id-000',
  },
  {
    id: 'mock-comment-id-002',
    databaseId: 2,
    status: CommentStatusEnum.Approve,
    author: {
      name: 'Child 2 Author Name',
      avatar: {
        url: 'https://www.example-child-2.com/avatar.jpg',
        width: 100,
        height: 100,
      },
    },
    content: 'Sample Child 2 comment content',
    date: '2021-01-02T00:00:00',
    parentId: 'mock-comment-id-000',
  },
  {
    id: 'mock-comment-id-003',
    databaseId: 3,
    status: CommentStatusEnum.Approve,
    author: {
      name: 'Parent 2 Author Name',
      avatar: {
        url: 'https://www.example-parent-2.com/avatar.jpg',
        width: 100,
        height: 100,
      },
    },
    content: 'Sample Parent 2 comment content',
    date: '2021-01-01T00:00:00',
    parentId: null,
  },
];

const mockCommentCount = 10;

const mockTitle = 'Sample Title';
const mockPostId = '123';

const mockInitialCommentCount = 1;
const mockInitialComments: Comment[] = [mockComments[0]];

const mockMutate = jest.fn();
const mockSetSize = jest.fn();

const mockData: SWRInfiniteResponse<{
  comments: Comment[];
  commentCount: number;
}> = {
  data: [
    {
      comments: mockComments,
      commentCount: mockCommentCount,
    },
  ],
  mutate: mockMutate,
  isLoading: false,
  isValidating: false,
  size: 1,
  setSize: mockSetSize,
  error: undefined,
};

describe('PostComments', () => {
  const mockUseSWRInfinite = useSWRInfinite as jest.MockedFunction<
    typeof useSWRInfinite<{
      comments: Comment[];
      commentCount: number;
    }>
  >;
  const mockPostCommentForm =
    CommentsService.postCommentForm as jest.MockedFunction<
      typeof CommentsService.postCommentForm
    >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSWRInfinite.mockReturnValue(mockData);

    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  it('should render the comments section with the correct title', () => {
    render(
      <PostComments
        title={mockTitle}
        postId={mockPostId}
        initialCommentCount={mockInitialCommentCount}
        initialComments={mockInitialComments}
      />
    );

    expect(
      screen.getByText(`${mockCommentCount} Thoughts`)
    ).toBeInTheDocument();
    expect(screen.getByText(`on ${mockTitle}`)).toBeInTheDocument();
  });

  it('should render the initial comments', () => {
    const mockDataUpdated = {
      ...mockData,
      data: [
        {
          comments: mockInitialComments,
          commentCount: mockInitialCommentCount,
        },
      ],
    };
    mockUseSWRInfinite.mockReturnValue(mockDataUpdated);
    render(
      <PostComments
        title={mockTitle}
        postId={mockPostId}
        initialCommentCount={mockInitialCommentCount}
        initialComments={mockInitialComments}
      />
    );

    const commentElements = screen.getAllByTestId('comment-box');
    expect(commentElements.length).toBe(mockInitialComments.length);
    expect(mockUseSWRInfinite).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        fallbackData: [
          {
            comments: mockInitialComments,
            commentCount: mockInitialCommentCount,
          },
        ],
      }
    );
  });

  it('should call handleSubmitValid when submitting a comment form', async () => {
    const createdComment = mockComments[1];
    mockPostCommentForm.mockResolvedValue({
      createdComment,
    });

    render(
      <PostComments
        title={mockTitle}
        postId={mockPostId}
        initialCommentCount={mockInitialCommentCount}
        initialComments={mockInitialComments}
      />
    );

    const user = userEvent.setup();

    const commentInput = screen.getByPlaceholderText('Your Comment');
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const webditeInput = screen.getByPlaceholderText('Website');
    const submitButton = screen.getByRole('button', { name: 'Submit Comment' });

    await user.type(commentInput, 'New comment');
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@email.com');
    await user.type(webditeInput, 'https://www.example.com');

    await user.click(submitButton);

    expect(CommentsService.postCommentForm).toHaveBeenCalledWith(
      mockPostId,
      {
        content: 'New comment',
        author: 'John Doe',
        authorEmail: 'john.doe@email.com',
        authorUrl: 'https://www.example.com',
      },
      undefined
    );
    expect(mockMutate).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Object)
    );
  });

  it('should call setSize when clicking the "Show more" button', async () => {
    const mockInitialCommentCountUpdated = 20;
    render(
      <PostComments
        title={mockTitle}
        postId={mockPostId}
        initialCommentCount={mockInitialCommentCountUpdated}
        initialComments={mockInitialComments}
      />
    );

    const showMoreButton = screen.getByText('Show more');
    await userEvent.click(showMoreButton);

    expect(mockSetSize).toHaveBeenCalled();
  });

  it('throws an error when the comments service fails', async () => {
    const errorMessage = 'Failed to post comment';
    mockPostCommentForm.mockRejectedValue(new Error(errorMessage));

    render(
      <PostComments
        title={mockTitle}
        postId={mockPostId}
        initialCommentCount={mockInitialCommentCount}
        initialComments={mockInitialComments}
      />
    );

    const user = userEvent.setup();

    const commentInput = screen.getByPlaceholderText('Your Comment');
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: 'Submit Comment' });

    await user.type(commentInput, 'New comment');
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@email.com');

    await user.click(submitButton);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
