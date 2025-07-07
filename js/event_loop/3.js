console.log('Start');

// 创建并立即决议多个 Promise
const promise1 = Promise.resolve('First Promise');
const promise2 = Promise.resolve('Second Promise');
const promise3 = new Promise(resolve => {
  resolve('Third Promise');
});

// 注册回调函数
promise1.then(value => console.log(value));
promise2.then(value => console.log(value));
promise3.then(value => console.log(value));

console.log('End');