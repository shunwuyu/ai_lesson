import { Card, CardContent, CardHeader } from '@/components/ui';
import { User, BookOpen, Calendar, Heart, Settings, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const user = {
    name: '张妈妈',
    phone: '138****8888',
    avatar: '👩',
    joinDate: '2024-01-15',
    children: [
      { name: '小明', age: 6, avatar: '👦' },
      { name: '小红', age: 4, avatar: '👧' },
    ],
    stats: {
      totalBooks: 25,
      totalActivities: 8,
      totalDays: 120,
      favoriteBooks: 12,
    },
  };

  const menuItems = [
    { icon: User, label: '个人信息', href: '/profile/info' },
    { icon: BookOpen, label: '孩子档案', href: '/profile/children' },
    { icon: Calendar, label: '阅读记录', href: '/reading-record' },
    { icon: Heart, label: '我的收藏', href: '/profile/favorites' },
    { icon: Settings, label: '设置', href: '/profile/settings' },
    { icon: LogOut, label: '退出登录', href: '/logout' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">个人中心</h1>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">{user.name}</h2>
                <p className="text-neutral-600">{user.phone}</p>
                <p className="text-sm text-neutral-500">加入时间：{user.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children Info */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-neutral-900">孩子档案</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.children.map((child, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-lg">
                    {child.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{child.name}</p>
                    <p className="text-sm text-neutral-600">{child.age}岁</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full mt-4">
              管理孩子档案
            </button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary-600 mb-1">{user.stats.totalBooks}</div>
              <div className="text-sm text-neutral-600">阅读本数</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-secondary-600 mb-1">{user.stats.totalActivities}</div>
              <div className="text-sm text-neutral-600">参加活动</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent-orange mb-1">{user.stats.totalDays}</div>
              <div className="text-sm text-neutral-600">阅读天数</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent-green mb-1">{user.stats.favoriteBooks}</div>
              <div className="text-sm text-neutral-600">收藏绘本</div>
            </CardContent>
          </Card>
        </div>

        {/* Menu */}
        <Card>
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-neutral-900">功能菜单</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-4 hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-900">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;