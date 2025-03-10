讲一下 script 标签里面 defer、async的理解，如果有3个 defer 标签 a.js、bjs、c.js,b.is 先加载完，它们的执行顺序是什么?
  a.js
  b.js
  c.js

- <script> 标签会阻塞页面的下载和解析，直到脚本完全加载和执行完毕
- 使用 defer 和 async 可以避免这种阻塞，提升页面加载性能。
- async 异步加载并立即执行，不保证顺序；defer 异步加载但按顺序执行，DOMContentLoaded前完成。
  模块化  defer 