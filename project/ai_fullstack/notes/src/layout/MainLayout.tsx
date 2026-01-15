import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { BackToTop } from '@/components/BackToTop';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 页面内容区域 */}
      <div className="h-full w-full">
        <Outlet />
      </div>
      
      {/* 底部导航 */}
      <BottomNav />
      <BackToTop threshold={400} />
    </div>
  );
};