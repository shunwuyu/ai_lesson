class EventEmitter {
    constructor() {
        // 用于存储事件及其对应的回调函数列表
        this.events = {};
    }

    // 订阅事件
    on(event, listener) {
        // 如果事件不存在，则初始化一个空数组
        if (!this.events[event]) {
            this.events[event] = [];
        }
        // 将回调函数加入事件的回调函数列表中
        this.events[event].push(listener);
    }

    // 订阅一次性事件
    once(event, listener) {
        // 包装函数，调用后解除订阅
        const onceListener = (...args) => {
            listener.apply(this, args);
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
    }

    // 解除订阅事件
    off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    // 触发事件
    emit(event, ...args) {
        if (!this.events[event]) return;

        // 依次执行事件的每个回调函数
        this.events[event].forEach(listener => {
            listener.apply(this, args);
        });
    }
}