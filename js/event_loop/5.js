async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('script end');


// script start
// async1 start
// async2
// script end
// promise
// async1 end
// setTimeout

// 同步执行顺序：script start → async1 start → async2 → script end

// await 会将其后代码（async1 end）放入微任务队列

// 所以 promise 和 async1 end 都在微任务阶段，按顺序执行

// 最后执行宏任务 setTimeout