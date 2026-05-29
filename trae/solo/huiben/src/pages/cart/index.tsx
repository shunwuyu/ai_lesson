import { Card, CardContent } from '@/components/ui';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      title: '小王子',
      author: '安托万·德·圣-埃克苏佩里',
      price: 35.8,
      quantity: 2,
      image: 'bg-gradient-to-br from-blue-100 to-blue-200',
    },
    {
      id: 2,
      title: '猜猜我有多爱你',
      author: '山姆·麦克布雷尼',
      price: 28.9,
      quantity: 1,
      image: 'bg-gradient-to-br from-green-100 to-green-200',
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">购物车</h1>
          <p className="text-neutral-600">管理您的商品</p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">购物车是空的</h3>
              <p className="text-neutral-600 mb-6">快去挑选您喜欢的绘本吧！</p>
              <Link to="/books" className="btn-primary">
                去逛逛
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">商品列表</h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-neutral-100 rounded-lg">
                        {/* Item Image */}
                        <div className={`w-16 h-20 ${item.image} rounded-lg flex items-center justify-center`}>
                          <span className="text-2xl">📚</span>
                        </div>

                        {/* Item Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-neutral-600 mb-2">{item.author}</p>
                          <p className="text-lg font-bold text-primary-600">¥{item.price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button className="p-1 rounded-full hover:bg-neutral-100">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button className="p-1 rounded-full hover:bg-neutral-100">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">订单摘要</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">商品小计</span>
                      <span className="font-medium">¥{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">运费</span>
                      <span className="text-green-600">免费</span>
                    </div>
                    <div className="border-t border-neutral-100 pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-neutral-900">总计</span>
                        <span className="text-xl font-bold text-primary-600">¥{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Link to="/checkout" className="btn-primary w-full mb-3">
                    去结算
                  </Link>
                  
                  <Link to="/books" className="btn-outline w-full">
                    继续购物
                  </Link>

                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ 满99元包邮，您已享受免费配送
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;