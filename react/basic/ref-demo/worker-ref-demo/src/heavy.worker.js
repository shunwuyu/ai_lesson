// heavy.worker.js  【独立子线程，无法访问DOM、window、react API】

// 监听主线程发过来的消息
self.onmessage = (e) => {
  console.log("Worker 收到主线程参数：", e.data);
  const { num } = e.data;

  // 耗时计算任务：超大循环求和
  let sum = 0;
  // 五百万次循环，模拟重度运算
  for (let i = 0; i < 5000000000; i++) {
    sum += num * i;
  }

  // 将计算结果发送回主线程
  self.postMessage({
    result: sum,
  });

  // self.close() // 一次性任务可以关闭worker
};

// 监听主线程关闭指令
self.onclose = () => {
  console.log("worker线程已经关闭");
};