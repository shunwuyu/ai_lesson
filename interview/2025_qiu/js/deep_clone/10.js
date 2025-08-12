// 这叫值传递，基本类型（number、string、boolean 等）都是这样。
let a = 100;
let b = a;  // 把 a 的值“复制”给 b

b = 200;    // 修改 b

console.log(a); // 100 ❌ a 没变
console.log(b); // 200 ✅ b 变了