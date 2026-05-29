# ES Modules 规范是什么

ECMAScript 6 (ES2015/ES6) 中引入的一项重要特性，旨在取代 CommonJS, 成为 JavaScript 模块化的主要标准。


## 与 CommonJS 规范的区别
CJS 模块使用 require 和 module.exports 实现导入和导出。
ESM 模块的导入使用 import 关键字，导出使用 export 关键字。

默认情况下 Node.js 会将 .js 后缀文件识别为 CJS 模块。

.mjs 作为文件后缀名  ems 
package.json 中 type 字段设置为 module。