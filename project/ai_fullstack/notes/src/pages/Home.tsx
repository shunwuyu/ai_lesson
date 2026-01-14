import {  Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import Slideshow, { type SlideData } from "@/components/SlideShow";
import InfiniteScroll from '@/components/InfiniteScroll';
import {
  useState,
  useEffect
} from 'react';

export default function Home() {
  const bannerData: SlideData[] = [
    {
      id: 1,
      title: "React 生态系统",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "移动端开发最佳实践",
      image: "https://img.36krcdn.com/hsossms/20260114/v2_1ddcc36679304d3390dd9b8545eaa57f@5091053@ai_oswg1012730oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp",
    },
    {
      id: 3,
      title: "百度上线七猫漫剧，打的什么主意？",
      image: "https://img.36krcdn.com/hsossms/20260114/v2_8dc528b02ded4f73b29b7c1019f8963a@5091053@ai_oswg1137571oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp",
    },
  ];

  const fetchPosts = async (page: number): Promise<{ id: number; title: string }[]> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // 每页返回 10 条
  return Array.from({ length: 10 }, (_, i) => ({
    id: (page - 1) * 10 + i + 1,
    title: `文章 ${(page - 1) * 10 + i + 1}`,
  }));
};

  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newPosts = await fetchPosts(page);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((p) => p + 1);
        // 假设最多 50 篇，模拟无更多数据
        if (page >= 5) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('加载失败', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载第一页
  useEffect(() => {
    loadMore();
  }, []);

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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="h-32 bg-white rounded-lg shadow-sm flex items-center justify-center border">
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
            <li
              key={post.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              {post.title}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
    </>
  );
}