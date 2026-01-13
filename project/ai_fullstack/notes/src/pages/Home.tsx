import {  Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Slideshow, {type SlideData } from "@/components/SlideShow";
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
      image: "https://images.unsplash.com/photo-1555421689-492a18d9c3ad?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Shadcn UI 组件库",
      // image: "..." // 如果没有图片，组件会显示 content 或 title
      content: <div className="text-primary text-4xl font-black">纯文字幻灯片</div>
    },
  ];
  return (
    <>
      <Header 
        title="首页"
        showBackBtn={true}
      />
      <Slideshow slides={bannerData} autoPlayDelay={4000} />
    {/* <Header
        title="我的应用"
        isTitleCenter={true} // 首页标题居中
        rightContent={
          <div className="gap-2 flex">
            <Button variant="ghost">登录</Button>
            <Button variant="default">注册</Button>
          </div>
        }
    /> */}
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
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white rounded-lg shadow-sm flex items-center justify-center border">
             Item {i}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}