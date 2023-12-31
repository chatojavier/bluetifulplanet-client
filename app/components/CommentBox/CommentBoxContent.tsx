import { formatDate } from '@app/utils/general';
import { FunctionComponent } from 'react';
import { Comment } from '@api/wp/comments/utils';
import SafeHTML from '../SafeHTML';

interface CommentBoxContentProps {
  commentData: Comment;
  reply?: boolean;
  onReply?: () => void;
}

const CommentBoxContent: FunctionComponent<CommentBoxContentProps> = ({
  commentData,
  reply,
  onReply,
}) => {
  const { author, date, content, status } = commentData || {};

  return (
    <div className="comment-box-content">
      <div className="comment-body-header | font-gilda">
        <h5 className="user-name | inline font-gilda font-bold text-lg">
          {author?.name}
        </h5>
        <span> &nbsp; &mdash; &nbsp; </span>
        {status === 'APPROVE' ? (
          <time dateTime={date as string} className="inline">
            {formatDate(date as string, 'PPPp')}
          </time>
        ) : (
          <span className="inline text-xs">
            Your comment is awaiting moderation. This is a preview.
          </span>
        )}
      </div>
      {content && (
        <div className="content | text-[13px] mb-2">
          <SafeHTML html={content} />
        </div>
      )}
      {!reply && onReply && (
        <button
          type="button"
          className="font-gilda leading-4 text-sm text-gray-400 font-bold"
          onClick={() => onReply()}
        >
          REPLY
        </button>
      )}
    </div>
  );
};

export default CommentBoxContent;
