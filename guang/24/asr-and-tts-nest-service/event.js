// Node.js 内置事件模块 EventEmitter
const { EventEmitter } = require('events');

// 创建事件对象
const emitter = new EventEmitter();

// 订阅（监听）自定义事件
emitter.on('msg', (content) => {
  console.log('监听到消息:', content);
});

// 触发事件，传递数据
emitter.emit('msg', 'hello world');
