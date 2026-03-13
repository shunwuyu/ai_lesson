console.log('1. 开始 (宏任务)');

// 1. 注册一个微任务 (Promise)
Promise.resolve().then(() => {
  console.log('3. Promise.then (微任务)');
});

// process.nextTick 是 Node.js 特有的 API，它的作用是将一个回调函数
// 放到当前执行栈的末尾、下一次事件循环开始之前执行。

// 2. 注册一个 nextTick 任务
process.nextTick(() => {
  console.log('2. process.nextTick (更高优先级的微任务)');
});

console.log('4. 结束 (宏任务)');