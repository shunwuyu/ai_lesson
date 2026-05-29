console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timeout2');
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
});

console.log('end');

// 同步先执行：start、end

// promise2 是主线程执行完后的微任务，优先宏任务执行

// timeout1 宏任务执行，产生一个微任务 promise1

// promise1 马上执行

// timeout2 是最后的宏任务
