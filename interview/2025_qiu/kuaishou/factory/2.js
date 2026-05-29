class AsyncEventEmitter {
  constructor() {
    this.events = new Map(); // 存储事件和订阅者
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  // 取消订阅
  off(event, listener) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
  }

  // 普通同步/异步触发事件，不等待结果
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(listener => listener(...args));
  }

  // 异步触发事件，等待所有订阅者完成
  async emitAsync(event, ...args) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    // 等待每个订阅者完成（如果是 Promise，会自动 await）
    await Promise.all(listeners.map(listener => listener(...args)));
  }
}

// 使用示例
const emitter = new AsyncEventEmitter();

// 订阅异步事件
emitter.on('data', async (msg) => {
  await new Promise(res => setTimeout(res, 1000));
  console.log('Listener 1:', msg);
});

emitter.on('data', async (msg) => {
  await new Promise(res => setTimeout(res, 500));
  console.log('Listener 2:', msg);
});

(async () => {
  console.log('Start emitAsync');
  await emitter.emitAsync('data', 'Hello Async');
  console.log('All listeners completed');
})();
