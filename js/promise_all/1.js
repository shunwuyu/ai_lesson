const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log('////////////////')
    resolve('结果1');
    // 如果想测试失败，可以把上面注释掉，启用下面这行：
    // reject('promise1 出错了！');
  }, 1000); // 1秒后完成
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('结果2');
    reject('promise2 出错了！');
  }, 150) 
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('结果3');
    // reject('promise3 出错了！');
  }, 800);
});

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('全部成功:', results); // 输出: ['结果1', '结果2', '结果3']
  })
  .catch(error => {
    console.log('有一个失败了:', error);
  });