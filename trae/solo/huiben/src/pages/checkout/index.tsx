import { Card, CardContent, Input } from '@/components/ui';
import { MapPin, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = [
    { title: '小王子', quantity: 2, price: 35.8 },
    { title: '猜猜我有多爱你', quantity: 1, price: 28.9 },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">订单结算</h1>
          <p className="text-neutral-600">确认订单信息并完成支付</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Address & Payment */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">收货地址</h2>
                
                <div className="space-y-4">
                  <Input
                    label="收货人姓名"
                    placeholder="请输入收货人姓名"
                    leftIcon={<User className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="手机号码"
                    type="tel"
                    placeholder="请输入手机号码"
                    leftIcon={<Phone className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="详细地址"
                    placeholder="请输入详细地址"
                    leftIcon={<MapPin className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="邮政编码"
                    placeholder="请输入邮政编码"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">支付方式</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50">
                    <input type="radio" name="payment" className="text-primary-600" defaultChecked />
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💚</span>
                      <span>微信支付</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50">
                    <input type="radio" name="payment" className="text-primary-600" />
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💙</span>
                      <span>支付宝</span>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">订单摘要</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-neutral-600">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="font-medium">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-2 mb-4 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">商品小计</span>
                    <span>¥{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">运费</span>
                    <span className="text-green-600">免费</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">优惠</span>
                    <span className="text-green-600">-¥0.00</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-900">总计</span>
                    <span className="text-2xl font-bold text-primary-600">¥{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Link to="/payment" className="btn-primary w-full mt-6">
                  立即支付
                </Link>
                
                <p className="text-xs text-neutral-500 text-center mt-4">
                  点击"立即支付"即表示您同意我们的服务条款
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;