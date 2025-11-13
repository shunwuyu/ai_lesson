import { Card, CardContent, CardHeader } from '@/components/ui';
import { Search, Filter, Star, Heart } from 'lucide-react';
import { useState } from 'react';

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const ageGroups = ['0-3岁', '3-6岁', '6-9岁', '9-12岁'];
  const categories = ['动物', '科学', '艺术', '历史', '童话', '成长'];

  const books = [
    {
      id: 1,
      title: '小王子',
      author: '安托万·德·圣-埃克苏佩里',
      age: '6-9岁',
      category: '童话',
      rating: 4.8,
      price: 35.8,
      cover: 'bg-gradient-to-br from-blue-100 to-blue-200',
    },
    {
      id: 2,
      title: '猜猜我有多爱你',
      author: '山姆·麦克布雷尼',
      age: '0-3岁',
      category: '成长',
      rating: 4.9,
      price: 28.9,
      cover: 'bg-gradient-to-br from-green-100 to-green-200',
    },
    {
      id: 3,
      title: '好饿的毛毛虫',
      author: '艾瑞·卡尔',
      age: '0-3岁',
      category: '动物',
      rating: 4.7,
      price: 32.5,
      cover: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    },
    {
      id: 4,
      title: '大卫，不可以',
      author: '大卫·香农',
      age: '3-6岁',
      category: '成长',
      rating: 4.6,
      price: 29.9,
      cover: 'bg-gradient-to-br from-red-100 to-red-200',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">绘本馆</h1>
          <p className="text-neutral-600">为0-12岁儿童精选优质绘本</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索绘本、作者或关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium text-neutral-700">筛选：</span>
            </div>
            
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="">所有年龄</option>
              {ageGroups.map((age) => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="">所有分类</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Book Cover */}
              <div className={`aspect-[3/4] ${book.cover} flex items-center justify-center relative`}>
                <div className="text-center">
                  <div className="w-16 h-20 bg-white/80 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="text-sm font-medium text-neutral-700">{book.title}</p>
                </div>
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-neutral-400 hover:text-red-500" />
                </button>
              </div>

              {/* Book Info */}
              <CardContent className="pt-4">
                <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-neutral-600 mb-2">{book.author}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                    {book.age}
                  </span>
                  <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                    {book.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-neutral-700">{book.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">¥{book.price}</span>
                </div>

                <div className="flex gap-2">
                  <button className="btn-secondary flex-1 text-sm">
                    预览
                  </button>
                  <button className="btn-primary flex-1 text-sm">
                    查看详情
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

export default BooksPage;