'use client';

import { Comment } from '@api/wp/comments/utils';
import { ApiRoutes } from '@app/api/api.types';
import CommentBox, { CommentBoxSkeleton } from '@app/components/CommentBox';
import CommentReply from '@app/components/CommentReply';
import { CommentFormOutput } from '@app/components/CommentReply/CommentReplyForm';
import { decodeHTML } from '@app/components/SafeHTML/SafeHTML';
import commentsService, {
  GetCommentsByPostIdReturn,
} from '@app/services/commentsService';
import fetchData from '@app/utils/fetchData';
import {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { orderNestedComments } from './PostComments.utils';

interface PostCommentsProps {
  title: string;
  postId: string;
  initialCommentCount: number;
  initialComments?: Comment[] | null;
}

const PostComments: FunctionComponent<PostCommentsProps> = ({
  title,
  postId,
  initialCommentCount,
  initialComments,
}) => {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<
    number | null
  >(null);
  const [isLoadingCreated, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const sectionRef = useRef<HTMLElement>(null);
  const limit = 10;
  const totalPages = useRef<number>(initialCommentCount / limit);

  const getKey: SWRInfiniteKeyLoader = useCallback(
    (index, previousPageData) => {
      totalPages.current = Math.ceil(
        (previousPageData?.commentCount ?? initialCommentCount) / limit
      );
      if (index + 1 > totalPages.current) return null;
      return `${ApiRoutes.COMMENTS}/${postId}?page=${index + 1}`;
    },
    [initialCommentCount, postId]
  );

  const fallbackData = [
    {
      comments: initialComments ?? [],
      commentCount: initialCommentCount,
    },
  ];

  const {
    data: commentsResponses,
    mutate,
    isLoading: isLoadingData,
    isValidating,
    size: pageSize,
    setSize,
  } = useSWRInfinite<GetCommentsByPostIdReturn>(
    getKey,
    key => fetchData.get(key, { cache: 'no-store' }),
    {
      fallbackData,
    }
  );

  const comments = useMemo(
    () =>
      commentsResponses
        ? orderNestedComments(commentsResponses.flatMap(r => r.comments))
        : [],
    [commentsResponses]
  );

  const commentCount = useMemo(
    () => commentsResponses?.[0]?.commentCount,
    [commentsResponses]
  );

  const handleSubmitValid = async (
    formData: CommentFormOutput,
    parent?: string | null
  ) => {
    setLoading(true);
    setMessage('');
    if (!parent) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    try {
      const { createdComment } = await commentsService.postCommentForm(
        postId,
        formData,
        parent
      );
      setLoading(false);
      setSelectedCommentIndex(null);
      if (createdComment) {
        mutate(
          currentComments => [
            {
              comments: [createdComment],
              commentCount: currentComments?.[0].commentCount ?? 0,
            },
            ...(currentComments ?? []),
          ],
          { revalidate: false }
        );
      } else {
        throw new Error('Comment was not published, try again');
      }
    } catch (error) {
      setLoading(false);
      setMessage(decodeHTML((error as Error).message));
      if (parent) sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      setSelectedCommentIndex(null);
      throw error;
    }
  };

  return (
    <section
      id="post-comments"
      className="post-comments | max-w-5xl m-auto px-4 md:px-12 pb-18"
      ref={sectionRef}
    >
      <div className="comments-container | pt-11 pb-11 border-t border-gray-400">
        <h4 className="comments-title | uppercase mb-8">
          <span className="text-gray-400">{`${commentCount} Thoughts`}</span>
          <span>{` on ${title}`}</span>
        </h4>
        {message && (
          <div className="p-2 border text-sm border-red-600 mb-4">
            {message}
          </div>
        )}
        {(isLoadingData || (isLoadingCreated && !selectedCommentIndex)) && (
          <ul>
            <li className="comment | mb-4 last:mb-0">
              <CommentBoxSkeleton />
            </li>
          </ul>
        )}
        {comments && comments.length && comments.length > 0 ? (
          <ul className="comments-list space-y-10">
            {comments.map((comment, index) => (
              <li className="comment | mb-4 last:mb-0" key={comment.id}>
                <CommentBox
                  commentData={comment}
                  onSubmitValid={values =>
                    handleSubmitValid(values, comment.id)
                  }
                  onReply={() => setSelectedCommentIndex(index)}
                  onCancel={() => setSelectedCommentIndex(null)}
                  showReplyForm={selectedCommentIndex === index}
                >
                  <ul className="comment-replies">
                    {isLoadingCreated && selectedCommentIndex === index && (
                      <li
                        className="comment | mb-4 last:mb-0"
                        key="childCommentSkeleton"
                      >
                        <CommentBoxSkeleton reply />
                      </li>
                    )}
                    {comment.children?.map(commentReply => (
                      <li
                        className="comment | mb-4 last:mb-0"
                        key={commentReply.id}
                      >
                        <CommentBox commentData={commentReply} reply />
                      </li>
                    ))}
                  </ul>
                </CommentBox>
              </li>
            ))}
            {isValidating && (
              <li className="comment | mb-4 last:mb-0">
                <CommentBoxSkeleton />
              </li>
            )}
          </ul>
        ) : null}
        {pageSize < totalPages.current && (
          <div className="showmore-button-wrapper | flex justify-center mt-12">
            <button
              type="button"
              className="showmore-button | text-bluetifulBlue uppercase text-sm font-bold cursor-pointer"
              onClick={() => setSize(pageSize + 1)}
              disabled={isLoadingData || isValidating}
            >
              Show more
            </button>
          </div>
        )}
      </div>
      {selectedCommentIndex === null && (
        <CommentReply onSubmitValid={values => handleSubmitValid(values)} />
      )}
    </section>
  );
};

export default PostComments;
