import { FunctionComponent } from 'react';
import { SubmitHandler } from 'react-hook-form';
import CommentReplyForm, { CommentFormOutput } from './CommentReplyForm';
import CommentReplyHeader from './CommentReplyHeader';

type CommentReplyProps = {
  onCancel?: () => void;
  name?: string | null | undefined;
  onSubmitValid: SubmitHandler<CommentFormOutput>;
};

const CommentReply: FunctionComponent<CommentReplyProps> = ({
  onCancel,
  name,
  onSubmitValid,
}) => {
  return (
    <div className="comment-reply">
      <CommentReplyHeader name={name} onCancel={onCancel} />
      <CommentReplyForm onSubmitValid={onSubmitValid} />
    </div>
  );
};

export default CommentReply;
