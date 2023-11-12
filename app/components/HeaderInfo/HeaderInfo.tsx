import { UserBasicFragment } from '@app/graphql/__generated__/graphql';
import { formatDate } from '@app/utils/general';
import { Maybe } from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface HeaderInfoProps {
  author: Maybe<UserBasicFragment> | null;
  date: Maybe<string> | null;
  className?: string;
}

const HeaderInfo: FunctionComponent<HeaderInfoProps> = ({
  author,
  date,
  className,
}) => {
  return (
    <aside className={`post-related | text-xs uppercase mb-4 | ${className}`}>
      {author && (
        <address className="inline">
          <Link href="/about-me">{author.name}</Link>
        </address>
      )}
      {date && (
        <>
          <span> &nbsp; &mdash; &nbsp; </span>
          <time dateTime={date} className="inline">
            {formatDate(date as string)}
          </time>
        </>
      )}
    </aside>
  );
};

export default HeaderInfo;
