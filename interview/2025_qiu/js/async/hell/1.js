// 模拟异步操作：获取用户、订单、商品信息
function getUser(callback) {
    setTimeout(() => {
        console.log('1. 用户获取完成');
        callback({ id: 1, name: 'Alice' });
    }, 1000);
}
  
function getOrder(userId, callback) {
    setTimeout(() => {
        console.log('2. 订单获取完成');
        callback({ orderId: 'T123', productId: 101 });
    }, 800);
}
  
function getProduct(productId, callback) {
    setTimeout(() => {
        console.log('3. 商品获取完成');
        callback({ name: 'iPhone', price: 999 });
    }, 600);
}
  
  // 回调地狱：层层嵌套
getUser(user => {
    console.log(user);
    getOrder(user.id, order => {
        console.log(order);
        getProduct(order.productId, product => {
            console.log('最终结果:', product);
        });
    });
});