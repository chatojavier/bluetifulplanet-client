import { FunctionComponent } from 'react';
import Image from 'next/image';
import { MediaItemFieldsFragment } from '@app/graphql/__generated__/graphql';
import { PostResumeMapped } from '@app/utils/posts';
import Link from 'next/link';
import HeaderInfo from '../HeaderInfo';
import HeaderTitle from '../HeaderTitle';
import { plainText } from '../SafeHTML';
import { ArrowRightLong } from '../Icons';

interface PostSnippedProps {
  title: string | null | undefined;
  excerpt: string | null | undefined;
  featuredImage: MediaItemFieldsFragment | null;
  author: PostResumeMapped['author'] | null;
  date: PostResumeMapped['date'] | null;
  slug: PostResumeMapped['slug'] | null;
}

const PostSnipped: FunctionComponent<PostSnippedProps> = ({
  title,
  excerpt,
  featuredImage,
  author,
  date,
  slug,
}) => {
  const { sourceUrl, altText, mediaDetails } = featuredImage || {};
  const { width, height } = mediaDetails || { width: 0, height: 0 };
  const path = `/blog/${slug}`;
  return (
    <div className="post-snipped | px-3 | sm:w-10/12 sm:mx-auto | lg:w-3/4">
      {sourceUrl && (
        <Link href={path}>
          <figure className="aspect-w-16 aspect-h-9">
            <Image
              src={sourceUrl}
              alt={altText as string}
              width={width as number}
              height={height as number}
              sizes="(min-width: 1024px) 75vw, (min-width: 640px) 83.33vw, 100vw"
              className="object-cover"
            />
          </figure>
        </Link>
      )}
      <div className="flex flex-col items-center py-8 px-4 bg-white | md:relative md:p-12 md:-mt-[90px] md:mx-[10%]">
        <HeaderInfo author={author} date={date} />
        {title && (
          <Link href={path}>
            <HeaderTitle
              title={title}
              type="h2"
              className="text-black text-center"
            />
          </Link>
        )}
        {excerpt && (
          <p className="!mb-5 text-center text-sm line-clamp-4">
            {plainText(excerpt).replace(/\s*[[\]]/g, '')}
          </p>
        )}
        <Link href={path}>
          <ArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default PostSnipped;
