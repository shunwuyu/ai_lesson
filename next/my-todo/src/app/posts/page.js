// app/posts/page.js
import Link from 'next/link';
import { getPosts } from '../lib/api';

export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">文章列表</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link 
                href={`/posts/${post.id}`} 
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <div className="text-sm text-gray-500">
              <span>作者: {post.author} </span>
              <span>发布日期: {post.createdAt}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}