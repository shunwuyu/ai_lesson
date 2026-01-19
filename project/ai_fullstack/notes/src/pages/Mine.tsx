import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Mine() {
  const { user, isLogin, logout } = useUserStore();
  const navigate = useNavigate();

  // 虽然 Tab 栏做了拦截，但为了安全，页面内部也做一个检查（双重保险）
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 pb-10 mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
            <Avatar className="h-16 w-16">
              {/* 如果 user 对象中有 avatar 字段则会显示图片 */}
              <AvatarImage src={user.avatar} alt={user.name} />
              
              {/* 如果图片加载失败或没有图片，显示 fallback 内容 */}
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar> 
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center py-2 border-b last:border-0">
            <span>我的订单</span>
            <span className="text-gray-400 text-sm">{'>'}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b last:border-0">
            <span>设置</span>
            <span className="text-gray-400 text-sm">{'>'}</span>
          </div>
        </div>

        <Button 
          variant="destructive" 
          className="w-full mt-8" 
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}