import SafeHTML from '@app/components/SafeHTML/SafeHTML';
import PostsService from '@app/services/PostsService';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import NavigationArrows from '@app/components/NavigationArrows/NavigationArrows';
import HeaderInfo from '@app/components/HeaderInfo';
import HeaderTitle from '@app/components/HeaderTitle';
import TagsContainer from '@app/components/TagsContainer/TagsContainer';
import { Metadata } from 'next';
import PostComments from '@app/components/PostComments';
import styles from './page.module.scss';

export type PostProps = {
  params: {
    post: string;
  };
};

export const generateMetadata = async ({
  params,
}: {
  params: PostProps['params'];
}): Promise<Metadata> => {
  const { post = null } =
    params.post && !Array.isArray(params.post)
      ? await PostsService.getPostByUri(params.post)
      : {};

  const { title } = post || {};

  return {
    title,
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

const Post = async ({ params }: PostProps) => {
  const { post } = await getPostData(params);
  const {
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
    previous,
    next,
  } = post || {};

  const { sourceUrl = '', altText, mediaDetails } = featuredImage || {};

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
          className="m-auto bg-white px-6 py-7 | md:px-12 py-10 md:mx-[5%] | lg:px-18 lg:pt-12 lg:pb-20 | xl:mx-auto xl:max-w-5xl"
        >
          <HeaderInfo author={author} date={date} />
          <header className="post-title">
            {title && (
              <HeaderTitle title={title} className="text-bluetifulBlue" />
            )}
          </header>
          <section className="post-content | mb-8">
            {content && <SafeHTML html={content} />}
          </section>
          <footer className="post-footer">
            {tags && <TagsContainer tags={tags} />}
          </footer>
        </article>
        {postId && (
          <PostComments
            title={title as string}
            postId={postId.toString()}
            initialCommentCount={commentCount ?? 0}
            initialComments={comments}
          />
        )}
      </div>
      {previous && (
        <NavigationArrows
          label={previous.title as string}
          url={`/blog/${previous.slug}`}
        />
      )}
      {next && (
        <NavigationArrows
          label={next.title as string}
          url={`/blog/${next.slug}`}
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
