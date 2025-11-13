import { Card, CardContent } from '@/components/ui';
import { User, Calendar, MapPin, Edit, Plus } from 'lucide-react';

const ProfileChildrenPage = () => {
  const children = [
    {
      id: 1,
      name: '小明',
      age: 6,
      avatar: '👦',
      interests: ['动物', '科学', '绘画'],
      readingLevel: '初级阅读者',
      joinDate: '2024-01-15',
      totalBooks: 15,
      favoriteBook: '小王子',
    },
    {
      id: 2,
      name: '小红',
      age: 4,
      avatar: '👧',
      interests: ['童话', '音乐', '手工'],
      readingLevel: '亲子共读',
      joinDate: '2024-03-20',
      totalBooks: 8,
      favoriteBook: '猜猜我有多爱你',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">孩子档案管理</h1>
          <p className="text-neutral-600">管理您孩子的阅读档案和成长记录</p>
        </div>

        <div className="mb-6">
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            添加孩子档案
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child) => (
            <Card key={child.id} className="overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center text-2xl">
                    {child.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-neutral-900">{child.name}</h2>
                    <p className="text-neutral-600">{child.age}岁 · {child.readingLevel}</p>
                  </div>
                  <button className="btn-text">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{child.totalBooks}</div>
                    <div className="text-sm text-neutral-600">阅读本数</div>
                  </div>
                  <div className="text-center p-3 bg-secondary-50 rounded-lg">
                    <div className="text-lg font-bold text-secondary-600">{child.favoriteBook}</div>
                    <div className="text-sm text-neutral-600">最爱绘本</div>
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-neutral-700 mb-2">兴趣标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {child.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>加入时间：{child.joinDate}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="btn-secondary flex-1 text-sm">
                    阅读记录
                  </button>
                  <button className="btn-primary flex-1 text-sm">
                    推荐绘本
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileChildrenPage;