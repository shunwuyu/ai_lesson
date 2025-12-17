# CommonJS

CommonJS 是一种 JavaScript 环境中模块化编程的规范。它定义了一套模块化导入和导出的语法和机制，旨在解决 JavaScript 在模块化方面的缺陷。

## 如何使用 CommonJS

CJS 模块使用 require 和 module.exports 实现导入和导出。

## 1 导出模块
module.exports 或 exports 

exports 实际上是 module.exports 的一个引用，当我们使用 exports 导出模块代码时，实际上是在向 module.exports 添加属性，

```
// 导出一个名为 "hello" 的函数到 "exports" 对象中
// 函数中会将 "Hello World!" 的信息输出到控制台中
exports.hello = function() {
  console.log("Hello World!");
};
```
等价于
```
// 导出一个名为 "hello" 的函数到 "exports" 对象中
// 函数中会将 "Hello World!" 的信息输出到控制台中
module.exports.hello = function() {
  console.log("Hello World!");
};
```
相当于
```
// 导出一个名为 "hello" 的函数到 "exports" 对象中
// 函数中会将 "Hello World!" 的信息输出到控制台中
module.exports.hello = function() {
  console.log("Hello World!");
};

```