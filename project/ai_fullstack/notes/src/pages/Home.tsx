import {
  useEffect
} from 'react';

import {  Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import Slideshow from "@/components/SlideShow";
import InfiniteScroll from '@/components/InfiniteScroll';
import PostItem from '@/components/PostItem';
import { useHomeStore } from '@/store/home';

export default function Home() {
  const { bannerData, posts, loading, hasMore, loadMore } = useHomeStore();
  useEffect(() => {
    loadMore();
  }, [])

  return (
    <>
      <Header 
        title="首页"
        showBackBtn={true}
      />
    <Slideshow slides={bannerData} autoPlayDelay={4000} />
    {/* space 子元素间的间距 */}
    <div className="p-4 space-y-4">
      {/* <h1 className="text-2xl font-bold mb-4">首页</h1> */}
      <Card>
        <CardHeader>
          <CardTitle>欢迎来到 React Mobile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">这是一个使用 Vite + Shadcn/UI + Zustand 构建的移动端示例。</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, index) => (
          <div key={index} className="h-32 bg-white rounded-lg shadow-sm flex items-center justify-center border">
             Item {i}
          </div>
        ))}
      </div>
    </div>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">文章列表</h1>
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={loading}
      >
        <ul className="space-y-3">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
    </>
  );
}