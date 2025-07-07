console.log('Start');

// 使用 process.nextTick 添加微任务
process.nextTick(() => {
  console.log('Process Next Tick');
});

// 创建并决议一个 Promise，添加微任务
Promise.resolve().then(() => {
  console.log('Promise Resolved');
});

console.log('End');