import { FunctionComponent, KeyboardEventHandler } from 'react';

interface CommentReplyHeaderProps {
  onCancel?: () => void;
  name: string | null | undefined;
}

const CommentReplyHeader: FunctionComponent<CommentReplyHeaderProps> = ({
  name,
  onCancel,
}) => {
  const handleCancelKeyDown: KeyboardEventHandler<HTMLSpanElement> = e => {
    if (e.key === 'Enter' && onCancel) {
      onCancel();
    }
  };
  return (
    <h3
      id="reply-title"
      className="comment-reply-title uppercase text-inherit mb-2"
    >
      {!name ? 'Leave a Reply' : `Reply to ${name}`}
      {onCancel && (
        <span
          role="button"
          id="cspanncel-comment-reply-link"
          className="text-gray-400"
          onClick={onCancel}
          onKeyDown={handleCancelKeyDown}
          tabIndex={0}
        >
          {' '}
          Cancel reply
        </span>
      )}
    </h3>
  );
};

export default CommentReplyHeader;
