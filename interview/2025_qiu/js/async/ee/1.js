// 发布-订阅中心
class EventEmitter {
    constructor() {
      // 存储事件及回调列表
      this.events = Object.create(null);
    }
  
    /**
     * 订阅事件
     * @param {string} event - 事件名
     * @param {Function} callback - 回调函数
     */
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
  
    /**
     * 发布事件（触发）
     * @param {string} event - 事件名
     * @param  {...any} args - 传递给回调的参数
     */
    emit(event, ...args) {
      if (this.events[event]) {
        this.events[event].forEach(callback => {
          callback.apply(this, args);
        });
      }
    }
  
    /**
     * 取消订阅
     * @param {string} event - 事件名
     * @param {Function} callback - 要移除的回调（可选：不传则移除所有）
     */
    off(event, callback) {
      if (!this.events[event]) return;
  
      if (!callback) {
        // 移除该事件所有监听
        delete this.events[event];
      } else {
        this.events[event] = this.events[event].filter(fn => fn !== callback);
      }
    }
  
    /**
     * 只监听一次
     * @param {string} event
     * @param {Function} callback
     */
    once(event, callback) {
      const onceWrapper = (...args) => {
        callback.apply(this, args);
        this.off(event, onceWrapper);
      };
      this.on(event, onceWrapper);
    }
  }
  
  // === 使用示例 ===
  const eventBus = new EventEmitter();
  
  // 订阅事件
  eventBus.on('login', (user) => {
    console.log('欢迎你，', user);
  });
  
  eventBus.on('login', (user) => {
    console.log('记录登录日志:', user);
  });
  
  // 只监听一次
  eventBus.once('logout', () => {
    console.log('已登出，清理一次资源');
  });
  
  // 发布事件
  eventBus.emit('login', 'Alice');
  // 输出：
  // 欢迎你， Alice
  // 记录登录日志: Alice
  
  eventBus.emit('logout'); // 已登出，清理一次资源
  eventBus.emit('logout'); // 无输出（once 只触发一次）