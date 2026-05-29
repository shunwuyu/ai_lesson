// app/posts/[id]/page.js
import { getPostById } from '../../lib/api';

export default function PostDetail({ params }) {
  const post = getPostById(params.id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-red-600">文章不存在</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-6 text-sm">
          作者: {post.author} | 发布日期: {post.createdAt}
        </div>
        <div className="prose prose-lg">
          <p className="text-lg leading-relaxed">{post.content}</p>
        </div>
        <div className="mt-8">
          <a 
            href="/posts" 
            className="text-blue-600 hover:underline"
          >
            ← 返回文章列表
          </a>
        </div>
      </article>
    </div>
  );
}