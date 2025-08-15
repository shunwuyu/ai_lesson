// 转为 Promise
function getUser() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('1. 用户获取完成');
        resolve({ id: 1, name: 'Alice' });
      }, 1000);
    });
  }
  
  function getOrder(userId) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('2. 订单获取完成');
        resolve({ orderId: 'T123', productId: 101 });
      }, 800);
    });
  }
  
  function getProduct(productId) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('3. 商品获取完成');
        resolve({ name: 'iPhone', price: 999 });
      }, 600);
    });
  }
  
  // 使用 async/await，线性书写
  async function loadUserData() {
    try {
      const user = await getUser();
      console.log(user);
  
      const order = await getOrder(user.id);
      console.log(order);
  
      const product = await getProduct(order.productId);
      console.log('最终结果:', product);
    } catch (err) {
      console.error('加载失败:', err);
    }
  }
  
  loadUserData();


  // 如果数据无依赖，可并发
async function loadAll() {
    try {
      const [user, order, product] = await Promise.all([
        getUser(),
        getOrder(1),
        getProduct(101)
      ]);
      console.log('用户、订单、商品:', user, order, product);
    } catch (err) {
      console.error('加载失败:', err);
    }
  }