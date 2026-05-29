# 手写 instanceOf —— 从原型链理解对象继承

一、前置知识：什么是 instanceof？

1.1 官方定义
instanceof 是 JavaScript 中的一个操作符，用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

function Person() {}
const p = new Person()

console.log(p instanceof Person) // true
console.log(p instanceof Object) // true（因为 Person.prototype.__proto__ === Object.prototype）


它不是判断“类型”，而是判断“原型链关系”。

所有对象最终都继承自 Object.prototype，所以几乎所有对象都是 Object 的实例。

二、动手前思考：如何模拟 instanceof？
2.1 核心思路
要判断 left instanceof right 是否成立，等价于：

“在 left 的原型链上，是否存在 right.prototype？”

2.2 原型链回顾
每个对象都有一个内部属性 [[Prototype]]（可通过 __proto__ 访问），它指向其构造函数的 prototype 对象。

而 prototype 本身也是一个对象，也有自己的 __proto__，如此形成一条链——原型链。

const arr = []
arr.__proto__ === Array.prototype
Array.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null

三、手写 instanceOf 实现
js
编辑
function instanceOf(left, right) {
    let proto = left.__proto__
    while (true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = proto.__proto__
    }
}


逐行解析：
代码	说明
let proto = left.__proto__	从实例对象的直接原型开始
while (true)	循环遍历整个原型链
if (proto === null)	到达原型链顶端（Object.prototype.__proto__ 是 null），未找到 → 返回 false
if (proto === right.prototype)	找到了匹配的构造函数原型 → 返回 true
proto = proto.__proto__	向上爬一级原型


function Animal() {}
function Dog() {}
Dog.prototype = new Animal()

const dog = new Dog()

console.log(instanceOf(dog, Dog))     // true
console.log(instanceOf(dog, Animal))  // true
console.log(instanceOf(dog, Object))  // true
console.log(instanceOf([], Array))    // true
console.log(instanceOf({}, RegExp))   // false