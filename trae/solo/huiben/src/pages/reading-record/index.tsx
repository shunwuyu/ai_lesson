import { Card, CardContent, CardHeader } from '@/components/ui';
import { Book, Calendar, Star, Clock } from 'lucide-react';

const ReadingRecordPage = () => {
  const readingRecords = [
    {
      id: 1,
      bookTitle: '小王子',
      bookAuthor: '安托万·德·圣-埃克苏佩里',
      readDate: '2024-12-10',
      rating: 5,
      notes: '和孩子一起阅读了这本经典童话，孩子很喜欢小王子的故事，特别是狐狸的那段友谊。',
      childName: '小明',
      childAge: 6,
      cover: 'bg-gradient-to-br from-blue-100 to-blue-200',
    },
    {
      id: 2,
      bookTitle: '猜猜我有多爱你',
      bookAuthor: '山姆·麦克布雷尼',
      readDate: '2024-12-08',
      rating: 5,
      notes: '非常温馨的绘本，让孩子感受到了父母深深的爱。读完后孩子主动拥抱了我。',
      childName: '小红',
      childAge: 4,
      cover: 'bg-gradient-to-br from-green-100 to-green-200',
    },
    {
      id: 3,
      bookTitle: '好饿的毛毛虫',
      bookAuthor: '艾瑞·卡尔',
      readDate: '2024-12-05',
      rating: 4,
      notes: '色彩鲜艳的绘本，帮助孩子认识了不同的食物和数字，很有教育意义。',
      childName: '小明',
      childAge: 6,
      cover: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    },
  ];

  const stats = {
    totalBooks: 25,
    totalDays: 30,
    averageRating: 4.6,
    thisMonth: 8,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">阅读记录</h1>
          <p className="text-neutral-600">记录每一次美好的亲子阅读时光</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stats.totalBooks}</div>
              <div className="text-sm text-neutral-600">总阅读本数</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary-600 mb-2">{stats.totalDays}</div>
              <div className="text-sm text-neutral-600">连续阅读天数</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent-orange mb-2">{stats.averageRating}</div>
              <div className="text-sm text-neutral-600">平均评分</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent-green mb-2">{stats.thisMonth}</div>
              <div className="text-sm text-neutral-600">本月阅读</div>
            </CardContent>
          </Card>
        </div>

        {/* Reading Records */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">最近阅读</h2>
            <button className="btn-primary">
              添加阅读记录
            </button>
          </div>

          {readingRecords.map((record) => (
            <Card key={record.id} className="overflow-hidden">
              <div className="flex">
                {/* Book Cover */}
                <div className={`w-32 ${record.cover} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="w-12 h-16 bg-white/80 rounded flex items-center justify-center mb-2">
                      <Book className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="text-xs font-medium text-neutral-700">{record.bookTitle.slice(0, 4)}</p>
                  </div>
                </div>

                {/* Record Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{record.bookTitle}</h3>
                      <p className="text-sm text-neutral-600 mb-2">{record.bookAuthor}</p>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.readDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{record.childName} ({record.childAge}岁)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < record.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">读后感</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">{record.notes}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn-text">
                      编辑
                    </button>
                    <button className="btn-text">
                      分享
                    </button>
                    <button className="btn-text text-red-600 hover:text-red-700">
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingRecordPage;