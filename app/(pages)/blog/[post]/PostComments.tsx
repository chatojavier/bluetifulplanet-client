'use client';

import CommentBox, { CommentBoxSkeleton } from '@app/components/CommentBox';
import CommentReply from '@app/components/CommentReply';
import { CommentFormOutput } from '@app/components/CommentReply/CommentReplyForm';
import { decodeHTML } from '@app/components/SafeHTML/SafeHTML';
import FormService from '@app/services/FormService';
import CommentsService from '@app/services/commentsService';
import { CommentMapped } from '@app/utils/comments';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PostCommentsProps {
  title: string;
  postId: string | number;
  commentCount: number;
  initialComments?: CommentMapped[] | null;
}

const PostComments: FunctionComponent<PostCommentsProps> = ({
  title,
  postId,
  commentCount,
  initialComments,
}) => {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<
    number | null
  >(null);
  const [comments, setComments] = useState<CommentMapped[]>(
    initialComments ?? []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const sectionRef = useRef<HTMLElement>(null);

  const getAndSetComments = useCallback(async () => {
    if (!initialComments) setLoading(true);
    const gettedComments = await CommentsService.getCommentsByPostId(postId);
    setLoading(false);
    if (gettedComments?.comments) setComments(gettedComments?.comments);
  }, [initialComments, postId]);

  useEffect(() => {
    getAndSetComments();
  }, [getAndSetComments]);

  const handleSubmitValid = async (
    data: CommentFormOutput,
    parent?: string | null
  ) => {
    setLoading(true);
    setMessage('');
    if (!parent) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    try {
      const createComment = await FormService.postCommentForm(
        postId,
        data,
        parent
      );
      setLoading(false);
      setSelectedCommentIndex(null);
      if (createComment.success && createComment.comment) {
        const comment = createComment.comment;
        setComments(currentComments => {
          const commentsUpdated = [...currentComments];
          commentsUpdated.unshift(comment);
          return commentsUpdated;
        });
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
      className="post-comments | max-w-5xl m-auto px-12 pb-18"
      ref={sectionRef}
    >
      <div className="comments-container | pt-11 pb-11 border-t border-gray-400">
        <h4 className="comments-title | uppercase mb-8">
          <span className="text-gray-400">{commentCount} Thoughts</span> on{' '}
          {title}
        </h4>
        {message && (
          <div className="p-2 border text-sm border-red-600 mb-4">
            {message}
          </div>
        )}
        {loading && !selectedCommentIndex && (
          <ul>
            <li className="comment | mb-4 last:mb-0">
              <CommentBoxSkeleton />
            </li>
          </ul>
        )}
        {comments && comments.length && comments.length > 0 ? (
          <ul className="comments-list space-y-10">
            {comments
              ?.filter(comment => !comment.parentId)
              .map((comment, index) => (
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
                      {loading && selectedCommentIndex === index && (
                        <li
                          className="comment | mb-4 last:mb-0"
                          key="childCommentSkeleton"
                        >
                          <CommentBoxSkeleton reply />
                        </li>
                      )}
                      {comments
                        .filter(
                          commentReply => commentReply.parentId === comment.id
                        )
                        .map(commentReply => (
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
          </ul>
        ) : null}
      </div>
      {selectedCommentIndex === null && (
        <CommentReply onSubmitValid={values => handleSubmitValid(values)} />
      )}
    </section>
  );
};

export default PostComments;
