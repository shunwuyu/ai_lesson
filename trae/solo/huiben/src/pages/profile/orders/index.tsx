import { Card, CardContent, Badge } from '@/components/ui';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const ProfileOrdersPage = () => {
  const orders = [
    {
      id: 'HB202412150001',
      date: '2024-12-15',
      status: 'shipped',
      statusText: '已发货',
      total: 100.5,
      items: [
        { title: '小王子', quantity: 2, price: 35.8 },
        { title: '猜猜我有多爱你', quantity: 1, price: 28.9 },
      ],
      trackingNumber: 'SF1234567890',
    },
    {
      id: 'HB202412120002',
      date: '2024-12-12',
      status: 'delivered',
      statusText: '已完成',
      total: 65.3,
      items: [
        { title: '好饿的毛毛虫', quantity: 1, price: 32.5 },
        { title: '大卫，不可以', quantity: 1, price: 29.9 },
      ],
      trackingNumber: 'SF0987654321',
    },
    {
      id: 'HB202412100003',
      date: '2024-12-10',
      status: 'pending',
      statusText: '待支付',
      total: 45.8,
      items: [
        { title: '小熊宝宝绘本系列', quantity: 1, price: 45.8 },
      ],
      trackingNumber: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'yellow', text: '待支付' },
      paid: { color: 'blue', text: '已支付' },
      shipped: { color: 'indigo', text: '已发货' },
      delivered: { color: 'green', text: '已完成' },
      cancelled: { color: 'red', text: '已取消' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.color === 'green' ? 'success' : config.color === 'yellow' ? 'warning' : 'default'}>
        {config.text}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Package className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">订单管理</h1>
          <p className="text-neutral-600">查看您的订单历史和物流信息</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-semibold text-neutral-900">订单号：{order.id}</h3>
                    <p className="text-sm text-neutral-600">下单时间：{order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">商品信息</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-600">
                          {item.title} × {item.quantity}
                        </span>
                        <span className="font-medium">¥{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-100">
                  <span className="font-medium text-neutral-900">订单总额</span>
                  <span className="text-lg font-bold text-primary-600">¥{order.total.toFixed(2)}</span>
                </div>

                {/* Order Actions */}
                <div className="flex gap-2">
                  <button className="btn-text">
                    查看详情
                  </button>
                  
                  {order.status === 'shipped' && (
                    <button className="btn-text">
                      查看物流
                    </button>
                  )}
                  
                  {order.status === 'pending' && (
                    <button className="btn-primary">
                      立即支付
                    </button>
                  )}
                  
                  {order.status === 'delivered' && (
                    <button className="btn-secondary">
                      再次购买
                    </button>
                  )}
                  
                  {(order.status === 'pending' || order.status === 'shipped') && (
                    <button className="btn-text text-red-600 hover:text-red-700">
                      取消订单
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">暂无订单</h3>
              <p className="text-neutral-600 mb-6">您还没有下过订单，快去选购喜欢的绘本吧！</p>
              <button className="btn-primary">
                去购物
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileOrdersPage;