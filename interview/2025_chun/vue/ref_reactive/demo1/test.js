const {effect, reactive} = require('@vue/reactivity')

let dummy
// 把数据包裹成响应式对象
const counter = reactive({ num1: 1, num2: 2 })
// 通过 effect 函数注册回调函数
effect(() => {
  dummy = counter.num1 + counter.num2
  // 响应式地通知 effect 去执行回调函数即可。
  console.log(dummy)// 每次counter.num1修改都会打印日志
})
setInterval(()=>{
  // 数据修改之后
  counter.num1++ // 响应式地通知 effect 去执行回调函数即可
},1000)