import { Comment } from '@api/wp/comments/utils';
import Image from 'next/image';
import { FunctionComponent } from 'react';

interface CommentBoxAvatarProps {
  avatar: NonNullable<Comment['author']>['avatar'];
  reply?: boolean;
}

const CommentBoxAvatar: FunctionComponent<CommentBoxAvatarProps> = ({
  avatar,
  reply,
}) => {
  return (
    avatar?.url && (
      <figure className="user-avatar | relative top-1">
        <Image
          src={avatar.url}
          width={avatar?.width as number}
          height={avatar?.height as number}
          alt="User Avatar"
          className={`max-w-none object-cover ${
            reply ? 'w-[64px] h-[64px]' : 'w-[88px] h-[88px] '
          }`}
        />
      </figure>
    )
  );
};

export default CommentBoxAvatar;
