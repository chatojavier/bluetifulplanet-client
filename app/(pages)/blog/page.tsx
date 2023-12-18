import Pagination from '@app/components/Pagination';
import PostSnipped from '@app/components/PostSnipped/PostSnipped';
import PostsService from '@app/apollo/PostsService';
import { NextPage } from 'next';

interface BlogProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const getPostData = async (page: number, postsPerPage: number) => {
  const offset = (page - 1) * postsPerPage;
  const result = await PostsService.queryAllPostsResume(offset, postsPerPage);
  if (!result) {
    return null;
  }
  return result;
};

const Blog: NextPage<BlogProps> = async ({ searchParams }) => {
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const itemsPerPage = 10;
  const { posts, pageInfo } =
    (await getPostData(currentPage, itemsPerPage)) || {};
  const { total: totalCount } = pageInfo || {};
  const totalPages = Math.ceil((totalCount || 0) / itemsPerPage);

  return (
    <div className="blog-page | h-full">
      <h1 className="sr-only">Blog</h1>
      {posts && posts.length > 0 ? (
        <ul className="space-y-10 mx-auto py-16">
          {posts.map(post => {
            return (
              <li key={post.id}>
                <PostSnipped {...post} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="post-not-found | h-full flex justify-center items-center">
          <p className="text-xl uppercase">No posts found</p>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          path="/blog"
          currentPage={currentPage}
          totalPages={totalPages}
          className="px-3 pb-16 | sm:w-10/12 sm:mx-auto | lg:w-3/4"
        />
      )}
    </div>
  );
};

export default Blog;
