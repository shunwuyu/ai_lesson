console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('script end');

// script start
// script end
// promise
// setTimeout

// 同步代码先执行：打印 script start 和 script end

// Promise.then 是微任务，优先于宏任务执行

// setTimeout 是宏任务，最后执行

// 为啥微任务优先
// JavaScript 是单线程的，浏览器执行完一轮同步代码后，
// 先清理掉“本轮遗留的事情”再处理下一轮大的事件。

// 幸福的 Event Loop
// LOL  
// 女朋友喝奶茶，点外卖 微任务
// 外卖到了，女朋友喝奶茶 宏任务
// LOL
// 女朋友 今天心情不好 发红包
// 8点后带她去逛街

// 微任务的类型
// process.nextTick
// Promise
// MutationObserver
// queueMicrotask