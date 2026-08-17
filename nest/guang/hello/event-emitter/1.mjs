// index.mjs
import { EventEmitter } from 'node:events'

// 事件总线
const bus = new EventEmitter()

// 订阅者
bus.on('order', (data) => {
  console.log('【订阅A】收到订单，打印日志：', data)
})

bus.on('order', (data) => {
  console.log('【订阅B】收到订单，发送短信通知：', data)
})

bus.on('order', (data) => {
  console.log('【订阅C】收到订单，更新数据库：', data)
})

// once 一次性订阅
bus.once('paySuccess', (payInfo) => {
  console.log('【一次性订阅】支付完成：', payInfo)
})

// 发布者触发事件
bus.emit('order', { orderId: 1001, goods: '蜜雪冰城柠檬水' })
bus.emit('paySuccess', { orderId: 1001, money: 4 })
// once只会执行一次，下面不会打印
bus.emit('paySuccess', { orderId: 1001, money: 4 })
