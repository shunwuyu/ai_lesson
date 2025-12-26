# curry 柯里化

## 什么是函数柯里化？

把“接收多个参数的函数”，拆成“多次接收一个参数的函数”。

// 普通函数
add(1, 2, 3)

// 柯里化后
add(1)(2)(3)

- 普通写法
```
function add(a, b) {
  return a + b
}

add(1, 2) // 3
```

- 柯里化写法

```js
function add(a) {
  return function (b) {
    return a + b
  }
}

add(1)(2) // 3
// 本质：利用闭包记住 a
```

## 三、为什么要用柯里化（业务视角）

```
function check(role, action) {
  return role === 'admin' && action === 'delete'
}
柯里化后：

const checkAdmin = role => action => role === 'admin' && action === 'delete'

const adminCheck = checkAdmin('admin')
adminCheck('delete') // true
好处：

固定一部分参数

生成更语义化的函数
```

## 统一日志 / 埋点

```
const log = type => message => {
  console.log(`[${type}]`, message)
}

const errorLog = log('error')
const infoLog = log('info')

errorLog('接口异常')
infoLog('页面加载完成')
```

大厂常问：“为什么不用传两个参数？”
答：为了参数复用 + 语义更清晰

## 手写实现 
// 定义一个高阶函数 curry，接收一个函数 fn 作为参数
function curry(fn) {
  // 返回一个新的函数 curried，它将逐步接收参数直到满足 fn 所需的全部参数数量
  return function curried(...args) {
    // 判断当前传入的参数数量是否已经大于或等于原函数 fn 所需的参数个数（即 fn.length）
    // fn.length 是函数的“形参个数”（arity），例如 function add(a, b) { ... } 的 length 是 2
    if (args.length >= fn.length) {
      // 如果参数已足够，就立即调用原函数 fn，并传入所有收集到的参数
      return fn(...args);
    }

    // 如果参数还不够，则返回一个新的函数，用于接收剩余的参数
    // 这个新函数会把之前收集的 args 和新传入的 rest 合并，再次调用 curried
    return (...rest) => curried(...args, ...rest);
  };
}


const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));       // 6
console.log(curriedAdd(1, 2)(3));       // 6
console.log(curriedAdd(1)(2, 3));       // 6
console.log(curriedAdd(1, 2, 3));       // 6