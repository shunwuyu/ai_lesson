import { Card, CardContent } from '@/components/ui';
import { MapPin, Calendar, Users, Clock, Star } from 'lucide-react';
import { useState } from 'react';

const ActivitiesPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都'];
  const types = ['亲子手工', '绘本阅读', '户外探索', '科学实验', '艺术创作'];

  const activities = [
    {
      id: 1,
      title: '亲子绘本手工制作',
      description: '和孩子一起制作可爱的绘本手工，培养动手能力，增进亲子感情。专业老师指导，提供所有材料。',
      city: '北京',
      type: '亲子手工',
      date: '2024-12-15',
      time: '14:00-16:00',
      price: 128,
      capacity: 20,
      booked: 15,
      rating: 4.8,
      location: '朝阳区绘本岛活动中心',
      image: 'bg-gradient-to-br from-pink-100 to-purple-100',
    },
    {
      id: 2,
      title: '圣诞主题绘本阅读会',
      description: '温馨的圣诞主题绘本阅读活动，让孩子在故事中感受节日的快乐，培养阅读兴趣。',
      city: '上海',
      type: '绘本阅读',
      date: '2024-12-22',
      time: '10:00-11:30',
      price: 88,
      capacity: 25,
      booked: 20,
      rating: 4.9,
      location: '浦东新区儿童图书馆',
      image: 'bg-gradient-to-br from-green-100 to-red-100',
    },
    {
      id: 3,
      title: '自然科学探索之旅',
      description: '带孩子走进大自然，观察植物和昆虫，学习自然科学知识，培养探索精神。',
      city: '广州',
      type: '户外探索',
      date: '2024-12-28',
      time: '09:00-12:00',
      price: 158,
      capacity: 15,
      booked: 8,
      rating: 4.7,
      location: '白云山公园',
      image: 'bg-gradient-to-br from-green-100 to-blue-100',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">亲子活动</h1>
          <p className="text-neutral-600">丰富多彩的线下活动，让亲子时光更精彩</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">城市</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                <option value="">所有城市</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">活动类型</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                <option value="">所有类型</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">日期</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            
            <div className="flex items-end">
              <button className="btn-primary w-full">
                搜索活动
              </button>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Activity Image */}
              <div className={`h-48 ${activity.image} flex items-center justify-center relative`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <p className="text-sm font-medium text-neutral-700">{activity.type}</p>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-neutral-700">
                    {activity.city}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-neutral-700">{activity.rating}</span>
                  </div>
                </div>
              </div>

              {/* Activity Info */}
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{activity.title}</h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>{activity.date} {activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Users className="w-4 h-4" />
                    <span>已报名 {activity.booked}/{activity.capacity} 组家庭</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">¥{activity.price}</span>
                    <span className="text-sm text-neutral-500 ml-1">/家庭</span>
                  </div>
                  <div className="text-sm text-neutral-500">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {activity.time.split('-')[0]}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn-secondary flex-1">
                    查看详情
                  </button>
                  <button className="btn-primary flex-1">
                    立即报名
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

export default ActivitiesPage;