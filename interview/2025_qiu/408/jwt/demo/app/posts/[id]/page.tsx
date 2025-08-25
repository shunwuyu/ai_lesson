// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation'

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.id}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    // 如果 API 返回 404，调用 notFound()
    if (res.status === 404) notFound()
    throw new Error('Failed to fetch post')
  }

  const post: Post = await res.json()

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Author: {post.author.email}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
    </article>
  )
}

// 定义类型
type Post = {
  id: number
  title: string
  content: string
  createdAt: string
  author: { email: string }
}

// 为动态路由生成静态参数 (可选，用于 SSG)
export async function generateStaticParams() {
  // 如果想预渲染部分文章，可以在这里获取所有 ID
  // const posts = await prisma.post.findMany({ select: { id: true } })
  // return posts.map((post) => ({ id: post.id.toString() }))
  return []
}