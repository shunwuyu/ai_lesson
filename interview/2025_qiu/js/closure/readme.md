# 闭包

- 一句话介绍闭包，先稳住面试官
- 闭包， closure, 是js 的重要语法特性
    能访问自由变量的函数就叫闭包
    在 JavaScript 中，当一个内部函数访问了它所在的外部函数作用域中的变量，即使外部函数已经执行完毕，这些变量依然会被保留在内存中，这种机制就叫闭包。

- 简化公式
    闭包 = 函数 + 它的词法作用域环境

- 形成条件
    函数嵌套函数
    内部函数可以在外界访问（返回，或挂载在全局）

- 底层原理
    词法作用域（Lexical Scope）
    JavaScript 在定义函数时，就确定了函数能访问哪些变量（作用域在代码写下来的时候就决定了）。
    作用域链（Scope Chain）：
    内部函数在查找变量时，会沿着作用域链向上查找外层变量。
    变量持久化原理：
    由于闭包函数依然被引用，JavaScript 引擎的 GC 认为这些外部变量还在用，所以不会销毁，导致变量值持久存在。

## 模型图

[Global Scope]
    ↑
[Outer Function Scope] ← 被闭包引用
    ↑
[Inner Function Scope]

## 场景
- 数据私有化（模拟私有变量）
```js
function createCounter() {
  let count = 0; // 外部不可直接访问
  return {
    inc: () => ++count,
    get: () => count
  }
}

const counter = createCounter();
counter.inc(); // 1
counter.inc(); // 2
console.log(counter.count); // undefined

```
- 防抖节流
```js
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}

const onResize = debounce(() => {
  console.log('resize handled');
}, 300);
window.addEventListener('resize', onResize);

```
- 循环绑定事件的经典坑
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); 
}
// 输出 3 3 3

for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(() => console.log(i), 100);
  })(i);
}
// 输出 0 1 2
IIFE（立即执行函数）制造闭包保存当前 i，解决 var 变量提升问题。
在老代码兼容中很常见，ES6 之后可以用 let。
```

- 缓存优化（记忆化）
```js
function memoize(fn) {
  const cache = {};
  return function(key) {
    if (cache[key]) return cache[key];
    const result = fn(key);
    cache[key] = result;
    return result;
  }
}

const getUser = memoize(id => {
  console.log('fetch user:', id);
  return { id, name: 'User' + id };
});

getUser(1); // fetch user:1
getUser(1); // 直接缓存

```

- 柯里化是将一个接收多个参数的函数，转换为一系列只接受一个参数的函数链。
```js
function curry(fn) {
  return function curried(...args) {
    // 如果参数足够，执行函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 否则返回一个新函数，继续收集参数
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4));     // 24
console.log(curriedMultiply(2, 3)(4));     // 24
console.log(curriedMultiply(2)(3, 4));     // 24
```

"闭包是函数与其外部词法作用域的组合，它让函数在外部作用域执行完后依然能访问里面的变量。本质是作用域链导致变量持久化，在工程中常用来做数据私有化、防抖/节流、事件绑定、缓存优化等。我在项目中经常用闭包减少全局变量污染，比如秒杀库存保护、输入防抖，但也注意它可能带来内存泄漏，所以会在不需要时手动释放引用。"

应用链

window
  ↓
document
  ↓
#btn DOM 节点
  ↓
事件监听函数（闭包）
  ↓
bigData（外部作用域变量）
