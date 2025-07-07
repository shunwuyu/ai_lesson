let timerCallback = function() {
  console.log('wait one second');
};
let httpCallback = function() {
  console.log('get server data success');
}

// 同步任务
console.log('hello');
// 同步任务
// 通知定时器线程 1s 后将 timerCallback 交由事件触发线程处理
// 1s 后事件触发线程将 timerCallback 加入到事件队列中
setTimeout(timerCallback,1000);
// 同步任务
// 通知异步http请求线程发送网络请求，请求成功后将 httpCallback 交由事件触发线程处理
// 请求成功后事件触发线程将 httpCallback 加入到事件队列中
$.get('www.xxxx.com',httpCallback);
// 同步任务
console.log('world');
//...
// 所有同步任务执行完后
// 询问事件触发线程在事件事件队列中是否有需要执行的回调函数
// 如果没有，一直询问，直到有为止
// 如果有，将回调事件加入执行栈中，开始执行回调代码

// JS引擎线程只执行执行栈中的事件
// 执行栈中的代码执行完毕，就会读取事件队列中的事件
// 事件队列中的回调事件，是由各自线程插入到事件队列中的
// 如此循环