// app/posts/page.tsx
"use client";

import {
  useEffect,
  useState
} from 'react';
import Link from 'next/link';
// import Link from 'next/link'
import VirtualList from '@/components/VirtualList'

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  // 直接在 Server Component 中获取数据
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      // const posts = res.json();
      setPosts(await res.json());
      // console.log(res.json());
    }
    fetchPosts();
  }, [])

  console.log(posts, '---------------------')
  const renderItem = (post, index) => (
      <article
        key={post.id}
        className="border-b pb-6 last:border-b-0"
      >
        <h2 className="font-semibold mb-2">
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
  );
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">loading...</p>
        ) : (
          <VirtualList
            data={posts}
            height={window.innerHeight} // 容器高度（比如留出标题空间）
            itemHeight={140} // 每项固定高度（px）
            renderItem={renderItem}
            overscan={3} // 预渲染上下各 3 个额外项
          />
          // posts.map((post) => (
          //   <article
          //     key={post.id}
          //     className="border-b pb-6 last:border-b-0"
          //   >
          //     <h2 className="text-2xl font-semibold mb-2">
          //       <Link 
          //         href={`/posts/${post.id}`} 
          //         className="text-indigo-600 hover:underline"
          //       >
          //         {post.title}
          //       </Link>
          //     </h2>
          //     <p className="text-gray-700 line-clamp-2 mb-3">{post.content}</p>
          //     <div className="flex items-center text-sm text-gray-500">
          //       <span>By {post.author.email}</span>
          //       <span className="mx-2">•</span>
          //       <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          //     </div>
          //   </article>
          // ))
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