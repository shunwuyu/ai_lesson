// ES6 的 Reflect 是一个内置对象，它提供了一系列静态方法
// ，用于以函数调用的方式更规范、更一致地操作对象的属性和行为
// （如读取、设置、删除属性，调用函数，构造实例等）
const user = { name: 'Andrew' }

// 读取属性
console.log(Reflect.get(user, 'name')) // Andrew

// 写入属性
Reflect.set(user, 'name', 'Jack')
console.log(user.name) // Jack