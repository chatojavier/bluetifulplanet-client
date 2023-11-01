import { FunctionComponent, PropsWithChildren } from 'react';
import { CommentMapped } from '@app/utils/comments';
import { SubmitHandler } from 'react-hook-form';
import CommentBoxAvatar from './CommentBoxAvatar';
import CommentBoxContent from './CommentBoxContent';
import CommentReply from '../CommentReply/CommentReply';
import { CommentFormOutput } from '../CommentReply/CommentReplyForm';

interface CommentBoxProps {
  commentData: CommentMapped;
  onSubmitValid?: SubmitHandler<CommentFormOutput>;
  reply?: boolean;
  showReplyForm?: boolean;
  onReply?: () => void;
  onCancel?: () => void;
}

const CommentBox: FunctionComponent<PropsWithChildren<CommentBoxProps>> = ({
  commentData,
  onSubmitValid,
  reply,
  children,
  showReplyForm,
  onReply,
  onCancel,
}) => {
  const { author } = commentData || {};
  const { avatar, name } = author || {};
  return (
    <div className="comment-box">
      <div
        className={`comment-box-container flex space-x-3 ${
          !showReplyForm ? 'mb-4' : 'mb-6'
        }`}
      >
        <CommentBoxAvatar avatar={avatar} reply={reply} />
        <div className="rigth-column w-full">
          <CommentBoxContent
            commentData={commentData}
            reply={reply}
            onReply={onReply}
          />
        </div>
      </div>
      {showReplyForm && onSubmitValid && (
        <CommentReply
          onCancel={onCancel}
          name={name}
          onSubmitValid={onSubmitValid}
        />
      )}
      <div className="children | ml-24">{children}</div>
    </div>
  );
};

export default CommentBox;
