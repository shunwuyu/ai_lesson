// main.mjs
import { EventBus } from './eventBus.mjs'

const bus = new EventBus()

bus.on('msg', (content) => {
  console.log('收到消息：', content)
})

bus.emit('msg', 'hello ESM 发布订阅')
