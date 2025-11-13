import { Card, CardContent } from '@/components/ui';
import { ArrowLeft, Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookDetailPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Back Button */}
        <Link to="/books" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          返回绘本馆
        </Link>

        {/* Book Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Book Cover */}
          <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-32 bg-white/80 rounded-lg flex items-center justify-center mb-4">
                <span className="text-4xl">📚</span>
              </div>
              <p className="text-lg font-medium text-neutral-700">绘本封面</p>
            </div>
          </div>

          {/* Book Info */}
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">小王子</h1>
            <p className="text-lg text-neutral-600 mb-4">安托万·德·圣-埃克苏佩里</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-neutral-600">4.8分 (1,234条评价)</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-neutral-700 font-medium">适读年龄：</span>
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-sm">6-9岁</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-700 font-medium">页数：</span>
                <span className="text-neutral-600">96页</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-700 font-medium">分类：</span>
                <span className="text-neutral-600">童话、成长</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">内容简介</h3>
              <p className="text-neutral-600 leading-relaxed">
                《小王子》是一部充满诗意而又温馨的美丽童话，被翻译成100多种语言，销量仅次于《圣经》。
                讲述了"我"在浩瀚的撒哈拉大沙漠上遇到了一个古怪奇特而又天真纯洁的小王子，他来自一颗遥远的小星球，
                因为与玫瑰花发生了矛盾而离开了自己的星球，在宇宙中旅行，最终来到了地球。
              </p>
            </div>

            <div className="flex gap-4">
              <button className="btn-primary flex-1">
                开始阅读
              </button>
              <button className="btn-secondary flex-1">
                加入购物车
              </button>
              <button className="btn-outline p-3">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;