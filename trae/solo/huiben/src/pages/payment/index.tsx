import { Card, CardContent } from '@/components/ui';
import { CheckCircle, Clock, CreditCard, Smartphone } from 'lucide-react';
import { useState } from 'react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('wechat');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false);
      // 支付成功，跳转到订单页面
      window.location.href = '/profile/orders';
    }, 3000);
  };

  const orderInfo = {
    orderNumber: 'HB202412150001',
    totalAmount: 100.50,
    items: [
      { title: '小王子', quantity: 2, price: 35.8 },
      { title: '猜猜我有多爱你', quantity: 1, price: 28.9 },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">订单支付</h1>
            <p className="text-neutral-600">订单号：{orderInfo.orderNumber}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">选择支付方式</h2>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'wechat' ? 'border-green-500 bg-green-50' : 'border-neutral-200 hover:bg-neutral-50'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="wechat"
                        checked={paymentMethod === 'wechat'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-green-600"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">微信支付</p>
                          <p className="text-sm text-neutral-600">使用微信扫码支付</p>
                        </div>
                      </div>
                    </label>

                    <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'alipay' ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 hover:bg-neutral-50'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="alipay"
                        checked={paymentMethod === 'alipay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">支付宝</p>
                          <p className="text-sm text-neutral-600">使用支付宝扫码支付</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600 mb-2">支付说明：</p>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 支付过程安全可靠，支持多种支付方式</li>
                      <li>• 支付成功后，我们会立即为您安排发货</li>
                      <li>• 如有问题，请及时联系客服</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">订单详情</h2>
                  
                  <div className="space-y-3 mb-4">
                    {orderInfo.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-600">
                          {item.title} × {item.quantity}
                        </span>
                        <span className="font-medium">¥{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-neutral-100 pt-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-neutral-900">总计</span>
                      <span className="text-2xl font-bold text-primary-600">¥{orderInfo.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      paymentMethod === 'wechat'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 animate-spin" />
                        处理中...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        {paymentMethod === 'wechat' ? (
                          <>
                            <Smartphone className="w-4 h-4" />
                            立即支付
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            立即支付
                          </>
                        )}
                      </div>
                    )}
                  </button>

                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>支付环境安全，请放心支付</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;