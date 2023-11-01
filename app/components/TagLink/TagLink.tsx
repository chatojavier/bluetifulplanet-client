import Link, { LinkProps } from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

type TagLinkProps = LinkProps & {
  children?: ReactNode;
};

const TagLink: FunctionComponent<TagLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="font-gilda uppercase text-xs text-black pt-[6px] pb-1 px-4 border-2 border-black rounded-full | hover:bg-black hover:text-white"
    >
      {children}
    </Link>
  );
};

export default TagLink;
