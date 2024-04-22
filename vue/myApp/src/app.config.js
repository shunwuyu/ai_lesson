export default defineAppConfig({
  pages: [
    'pages/index/index',
      'pages/my/index',
      'pages/shopCart/index',
      'pages/commdityDetail/index',
      'pages/order/index',
      'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#464a3d',
    backgroundColor: '#ffffff',
    selectedColor: '#fa2c19',
    borderStyle: 'black',
    list: [
        {
            pagePath: 'pages/index/index',
            text: '首页',
            iconPath: 'static/icon/home.png',
            selectedIconPath: 'static/icon/home_s.png',
        },
        {
            pagePath: 'pages/shopCart/index',
            text: '购物车',
            iconPath: 'static/icon/shop_cart.png',
            selectedIconPath: 'static/icon/shop_cart_s.png',
        },
        {
            pagePath: 'pages/order/index',
            text: '订单',
            iconPath: 'static/icon/order.png',
            selectedIconPath: 'static/icon/order_s.png',
        },
        {
            pagePath: 'pages/my/index',
            text: '我的',
            iconPath: 'static/icon/user.png',
            selectedIconPath: 'static/icon/user_s.png',
        },
    ]
  }
})
