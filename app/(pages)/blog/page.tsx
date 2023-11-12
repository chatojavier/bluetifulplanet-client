import PostSnipped from '@app/components/PostSnipped/PostSnipped';
import PostsService from '@app/services/PostsService';
import { NextPage } from 'next';

const getPostData = async () => {
  const result = await PostsService.getAllPostsResume();
  if (!result) {
    return null;
  }
  return result;
};

const Blog: NextPage = async () => {
  const { posts } = (await getPostData()) || {};
  return (
    <div className="blog-page">
      <h1 className="sr-only">Blog</h1>
      {posts ? (
        <ul className="space-y-10">
          {posts.map(post => {
            return (
              <li key={post.slug}>
                <PostSnipped {...post} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Blog;
