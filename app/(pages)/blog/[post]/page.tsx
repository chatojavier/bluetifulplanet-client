import SafeHTML from '@app/components/SafeHTML/SafeHTML';
import PostsService from '@app/services/PostsService';
import { formatDate } from '@app/utils/general';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TagLink from '@app/components/TagLink/TagLink';
import NavigationArrows from '@app/components/NavigationArrows/NavigationArrows';
import styles from './page.module.scss';
import PostComments from './PostComments';

export type PostProps = {
  params: {
    post: string;
  };
};

const getPostData = async (params: PostProps['params']) => {
  const result =
    params.post && !Array.isArray(params.post)
      ? await PostsService.getPostByUri(params.post)
      : null;

  if (!result || result.post?.status !== 'publish') {
    notFound();
  }

  return result;
};

const getPostRelatedLinks = async (params: PostProps['params']) => {
  const { posts } = (await PostsService.getAllPostsBasic()) || { posts: [] };
  const postCursor =
    posts.find(post => post.slug === params.post)?.cursor || '';

  return PostsService.getPrevNextPost(postCursor);
};

const Post = async ({ params }: PostProps) => {
  const {
    post: {
      databaseId: postId,
      title,
      content = '',
      slug,
      author,
      date,
      featuredImage,
      tags,
      commentCount,
      comments,
    },
  } = await getPostData(params);

  const { posts: relatedLinks } = await getPostRelatedLinks(params);
  const { prevLink, nextLink } = relatedLinks || {};

  const { sourceUrl = '', altText, mediaDetails } = featuredImage || {};

  // eslint-disable-next-line no-console
  console.log(`Rendering post [${params.post}]`);

  return (
    <>
      <div id={slug as string} className={styles.paralaxWrapper}>
        {sourceUrl && (
          <figure className={styles.paralaxContainer}>
            <Image
              src={sourceUrl}
              alt={altText as string}
              width={mediaDetails?.width as number}
              height={mediaDetails?.height as number}
              className={styles.paralaxImg}
            />
          </figure>
        )}
        <article
          itemScope
          itemType="http://schema.org/Article"
          className="max-w-5xl m-auto px-18 pt-12 pb-20 bg-white"
        >
          <aside className="post-related | text-xs uppercase mb-4">
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
          <header className="post-title">
            <h1 className="post-title | text-bluetifulBlue text-4xl">
              {title}
            </h1>
          </header>
          <section className="post-content | mb-8">
            {content && <SafeHTML html={content} />}
          </section>
          <footer className="post-footer">
            {tags && (
              <div className="tag-links | flex justify-center gap-4">
                {tags.map(({ uri: tagUri, name }) =>
                  tagUri ? (
                    <TagLink href={`/blog${tagUri}`} key={tagUri}>
                      {name}
                    </TagLink>
                  ) : null
                )}
              </div>
            )}
          </footer>
        </article>
        <PostComments
          title={title as string}
          postId={postId}
          commentCount={commentCount ?? 0}
          initialComments={comments}
        />
      </div>
      {prevLink && (
        <NavigationArrows
          label={prevLink.label}
          url={`/blog/${prevLink.url}`}
        />
      )}
      {nextLink && (
        <NavigationArrows
          label={nextLink.label}
          url={`/blog/${nextLink.url}`}
          next
        />
      )}
    </>
  );
};

export default Post;

export const generateStaticParams = async () => {
  const { posts } = (await PostsService.getAllPostsBasic()) || { posts: [] };

  const postsFiltered = posts?.filter(post => post.status === 'publish');

  return postsFiltered.map(post => ({
    postSlug: post.slug,
  }));
};
