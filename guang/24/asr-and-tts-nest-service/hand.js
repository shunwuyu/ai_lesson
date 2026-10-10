class EventEmitter {
  constructor() {
    // 事件存储容器：key=事件名，value=该事件对应的回调函数数组
    this.events = {};
  }

  /**
   * 订阅事件 on
   * @param {string} eventName 事件名称
   * @param {Function} callback 事件触发时执行的回调
   */
  on(eventName, callback) {
    // 如果该事件不存在，先初始化为空数组
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    // 将回调存入对应事件的数组，支持多个订阅者
    this.events[eventName].push(callback);
  }

  /**
   * 触发事件 emit
   * @param {string} eventName 事件名称
   * @param  {...any} args 传递给回调的参数
   * @returns {boolean} 是否有监听该事件
   */
  emit(eventName, ...args) {
    // 获取当前事件的回调列表，没有则返回false
    const callbacks = this.events[eventName];
    if (!callbacks) return false;
    // 遍历执行所有回调，把参数传进去
    callbacks.forEach(cb => {
      cb(...args);
    });
    return true;
  }

  /**
   * 只监听一次 once
   * @param {string} eventName 事件名称
   * @param {Function} callback 回调
   */
  once(eventName, callback) {
    // 包装一层回调：执行完立刻移除监听
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  /**
   * 移除事件监听 off
   * @param {string} eventName 事件名称
   * @param {Function} callback 要移除的回调
   */
  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (!callbacks) return;
    // 过滤掉目标回调
    this.events[eventName] = callbacks.filter(cb => cb !== callback);
  }
}

// ========== 测试代码 ==========
const emitter = new EventEmitter();

emitter.on('msg', (content) => {
  console.log('收到消息：', content);
});

emitter.once('hello', (name) => {
  console.log('once收到：', name);
});

emitter.emit('msg', 'hello world');
emitter.emit('hello', '张三');
emitter.emit('hello', '李四'); // once只会触发一次，这条不会打印
