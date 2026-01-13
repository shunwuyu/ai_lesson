import { Home, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils'; // Shadcn 的工具函数

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const tabs = [
    {
      label: '首页',
      path: '/',
      icon: Home,
    },
    {
      label: '我的',
      path: '/mine',
      icon: User,
    },
  ];

  const handleNavigation = (path: string) => {
    // 核心逻辑：拦截跳转
    if (path === '/mine' && !isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t bg-background flex items-center justify-around z-50 safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.path}
            onClick={() => handleNavigation(tab.path)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1"
          >
            <Icon 
              size={24} 
              className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground")} 
            />
            <span 
              className={cn("text-xs transition-colors", isActive ? "text-primary font-medium" : "text-muted-foreground")}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};