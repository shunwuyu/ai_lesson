import { Card, CardContent, CardHeader } from '@/components/ui';
import { Book, Heart, Users, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              欢迎来到绘本岛
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              让亲子时光更温暖，让阅读成为习惯。为0-12岁儿童和家长提供优质的绘本阅读体验。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                开始阅读
              </button>
              <button className="btn-secondary">
                浏览活动
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">丰富绘本</h3>
                <p className="text-neutral-600 text-sm">精选优质绘本，适合不同年龄段儿童</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">亲子互动</h3>
                <p className="text-neutral-600 text-sm">温馨的亲子阅读时光，增进感情</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent-green" />
                </div>
                <h3 className="text-lg font-semibold mb-2">亲子活动</h3>
                <p className="text-neutral-600 text-sm">丰富的线下活动，寓教于乐</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-accent-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">阅读记录</h3>
                <p className="text-neutral-600 text-sm">记录阅读历程，见证孩子成长</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">热门绘本</h2>
            <p className="text-neutral-600">精选推荐，适合不同年龄段儿童</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <Book className="w-16 h-16 text-primary-400" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">绘本标题 {item}</h4>
                  <p className="text-neutral-600 text-sm mb-3">适合年龄：3-6岁</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-semibold">¥29.90</span>
                    <button className="btn-primary text-sm px-3 py-1">查看详情</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">亲子活动</h2>
            <p className="text-neutral-600">丰富的线下活动，让亲子时光更精彩</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      北京
                    </span>
                    <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                      亲子手工
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2">亲子绘本手工活动</h4>
                  <p className="text-neutral-600 text-sm mb-4">
                    和孩子一起制作可爱的手工，培养动手能力，增进亲子感情。
                  </p>
                  <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                    <span>2024年12月15日</span>
                    <span>¥128/家庭</span>
                  </div>
                  <button className="btn-secondary w-full">立即报名</button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;