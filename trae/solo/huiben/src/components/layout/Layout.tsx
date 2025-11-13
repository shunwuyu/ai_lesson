import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, User, Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/books', label: '绘本馆', icon: BookOpen },
    { path: '/activities', label: '亲子活动', icon: Users },
    { path: '/reading-record', label: '阅读记录', icon: BookOpen },
    { path: '/profile', label: '我的', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-100 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">绘</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">绘本岛</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索绘本、活动..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <Link
                to="/login"
                className="btn-primary text-sm px-4 py-2"
              >
                登录
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden bg-white border-t border-neutral-100 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex-1 flex flex-col items-center py-2 px-1 text-xs transition-colors',
                  active
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 mt-16">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">绘本岛</h3>
              <p className="text-neutral-600 text-sm mb-4">
                让亲子时光更温暖，让阅读成为习惯。
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 text-sm">微</span>
                </div>
                <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <span className="text-secondary-600 text-sm">博</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="/books" className="hover:text-neutral-900">绘本馆</Link></li>
                <li><Link to="/activities" className="hover:text-neutral-900">亲子活动</Link></li>
                <li><Link to="/reading-record" className="hover:text-neutral-900">阅读记录</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">帮助中心</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><a href="#" className="hover:text-neutral-900">常见问题</a></li>
                <li><a href="#" className="hover:text-neutral-900">用户指南</a></li>
                <li><a href="#" className="hover:text-neutral-900">联系客服</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>客服热线：400-123-4567</li>
                <li>邮箱：service@huibendao.com</li>
                <li>工作时间：9:00-18:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 mt-8 pt-8 text-center text-sm text-neutral-600">
            <p>&copy; 2024 绘本岛. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;