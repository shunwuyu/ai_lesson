/**
* target: 要兼容的对象，可以是一个对象，数组,函数等等
* handler: 是一个对象，里面包含了可以监听这个对象的行为函数，比如上面例子里面的`get`与`set`
* 同时会返回一个新的对象proxy, 为了能够触发handler里面的函数，必须要使用返回值去进行其他操作，比如修改值
*/
//const proxy = new Proxy(target, handler)
//handler里面的方法可以有以下这十三个
//handler.get
//handler.set
//handler.has
// 当使用in判断属性是否在proxy代理对象里面时，会触发has，比如

const obj = { name: '子君' }

const proxy = new Proxy(obj, {
  has(target, key) {
    console.log(`检测属性: ${key}`)
    return key in target
  }
})
// defineProperty 不支持 in
console.log('name' in proxy) // 输出：检测属性: name → true
console.log('age' in proxy)  // 输出：检测属性: age → false
// handler.deleteProperty
// handler.apply 当proxy监听的是一个函数的时候，当调用这个函数时，会进入apply钩子函数
// handle.ownKeys
//Object.getOwnPropertyNames,Object.getownPropertySymbols,Object.keys
// handler.construct
// 当使用new操作符的时候，会进入construct这个钩子函数
// handler.defineProperty
// 当使用Object.defineProperty去修改属性修饰符的时候，会进入这个钩子函数
// handler.getPrototypeOf
// 当读取对象的原型的时候，会进入这个钩子函数
// handler.setPrototypeOf
// 当设置对象的原型的时候，会进入这个钩子函数
// handler.isExtensible
// 当通过Object.isExtensible去判断对象是否可以添加新的属性的时候，进入这个钩子函数
// handler.preventExtensions
// 当通过Object.preventExtensions去设置对象不可以修改新属性时候，进入这个钩子函数
// // handler.getOwnPropertyDescriptor
// 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时会进入这个钩子函数