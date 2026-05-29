import { Card, CardContent } from '@/components/ui';
import { ArrowLeft, MapPin, Calendar, Users, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActivityDetailPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Back Button */}
        <Link to="/activities" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          返回活动列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Activity Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  北京
                </span>
                <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                  亲子手工
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-neutral-700">4.8</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">亲子绘本手工制作</h1>
              <p className="text-neutral-600 leading-relaxed">
                和孩子一起制作可爱的绘本手工，培养动手能力，增进亲子感情。专业老师指导，提供所有材料。
              </p>
            </div>

            {/* Activity Image */}
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-lg font-medium text-neutral-700">活动照片</p>
              </div>
            </div>

            {/* Activity Details */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">活动详情</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium text-neutral-900">活动地点</p>
                      <p className="text-neutral-600">朝阳区绘本岛活动中心</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium text-neutral-900">活动时间</p>
                      <p className="text-neutral-600">2024年12月15日 (周日)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium text-neutral-900">具体时段</p>
                      <p className="text-neutral-600">14:00 - 16:00 (2小时)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium text-neutral-900">活动人数</p>
                      <p className="text-neutral-600">15/20 组家庭 (还有5个名额)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">活动介绍</h3>
                <div className="prose prose-neutral max-w-none">
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    本次亲子绘本手工制作活动专为3-8岁儿童及其家长设计，通过有趣的手工制作，
                    让孩子更好地理解绘本故事，培养动手能力和创造力。
                  </p>
                  
                  <h4 className="text-base font-semibold text-neutral-900 mb-2">活动亮点：</h4>
                  <ul className="text-neutral-600 space-y-1 mb-4">
                    <li>• 专业老师现场指导，确保活动质量</li>
                    <li>• 提供所有制作材料，无需自带</li>
                    <li>• 小班教学，每组家庭都能得到充分关注</li>
                    <li>• 作品可以带回家，留作美好纪念</li>
                    <li>• 活动结束后提供精美茶点</li>
                  </ul>
                  
                  <h4 className="text-base font-semibold text-neutral-900 mb-2">适合年龄：</h4>
                  <p className="text-neutral-600 mb-4">3-8岁儿童及家长</p>
                  
                  <h4 className="text-base font-semibold text-neutral-900 mb-2">注意事项：</h4>
                  <ul className="text-neutral-600 space-y-1">
                    <li>• 请提前10分钟到达活动现场</li>
                    <li>• 建议穿着舒适、不怕脏的衣服</li>
                    <li>• 活动中请家长全程陪同孩子</li>
                    <li>• 如因特殊情况无法参加，请提前24小时取消</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary-600">¥128</span>
                    <span className="text-sm text-neutral-500">/家庭</span>
                  </div>
                  <p className="text-sm text-neutral-600">包含所有材料和茶点</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>2024年12月15日</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock className="w-4 h-4" />
                    <span>14:00-16:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4" />
                    <span>朝阳区绘本岛</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Users className="w-4 h-4" />
                    <span>15/20 已报名</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">✓ 名额充足</span>
                      <br />
                      还有5个名额，请尽快报名
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="btn-primary w-full">
                    立即报名
                  </button>
                  <button className="btn-outline w-full">
                    收藏活动
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <h4 className="font-medium text-neutral-900 mb-3">有疑问？</h4>
                  <p className="text-sm text-neutral-600 mb-3">
                    如果您对活动有任何疑问，请随时联系我们。
                  </p>
                  <button className="btn-text text-sm">
                    联系客服
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;