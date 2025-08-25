// app/posts/page.tsx
import Link from 'next/link'

export default async function PostsPage() {
  // 直接在 Server Component 中获取数据
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: 'no-store', // 禁用缓存，获取最新数据
  })
  const posts: Post[] = await res.json()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="border-b pb-6 last:border-b-0"
            >
              <h2 className="text-2xl font-semibold mb-2">
                <Link 
                  href={`/posts/${post.id}`} 
                  className="text-indigo-600 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 line-clamp-2 mb-3">{post.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>By {post.author.email}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

// 定义类型
export type Post = {
  id: number
  title: string
  content: string
  published: boolean
  createdAt: string
  author: { email: string }
}