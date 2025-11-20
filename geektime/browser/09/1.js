// 在块级作用域中，let myname 声明会将 myname 绑定到该块的词法环境中，
// 并形成“暂时性死区”（TDZ）。尽管外部已存在同名变量，但一旦块内使用 let 
// 重新声明，JavaScript 引擎会在整个块中屏蔽外部变量。因此，
// 在 let myname = '极客邦' 执行前访问 myname，会因处于 TDZ 而抛出 
// ReferenceError，而非引用外部的 '极客时间'。
let myname= '极客时间'
{ 
  console.log(myname)  // ReferenceError: Cannot access 'myname' before initialization
  let myname= '极客邦'
}