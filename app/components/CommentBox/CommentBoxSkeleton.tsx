import { FunctionComponent } from 'react';

interface CommentBoxSkeletonProps {
  reply?: boolean;
}

const CommentBoxSkeleton: FunctionComponent<CommentBoxSkeletonProps> = ({
  reply,
}) => {
  return (
    <div
      role="status"
      className="comment-box-container flex space-x-3 mb-4 animate-pulse"
    >
      <div className="user-avatar | relative">
        <div
          className={`max-w-none object-cover bg-gray-200 ${
            reply ? 'w-[64px] h-[64px]' : 'w-[88px] h-[88px] '
          }`}
        />
      </div>
      <div className="rigth-column w-full">
        <div className="comment-body-header flex items-baseline mb-3">
          <span className="user-name | w-40 h-4 bg-gray-200" />
          <span className="h-[14px] text-sm"> &nbsp; &mdash; &nbsp; </span>
          <time className="w-44 h-[14px] bg-gray-200" />
        </div>
        <div className="content | mb-1 w-[800px] h-3 bg-gray-200" />
        <div className="content | mb-3 w-96 h-3 bg-gray-200" />
        <div className="reply | mb-2 w-10 h-4 bg-gray-200" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CommentBoxSkeleton;
