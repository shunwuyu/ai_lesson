function foo() {
  b = 2; // LHS 查询失败，隐式创建全局变量 b
}

foo(); 

console.log(b); // 输出 2，因为在全局作用域创建了变量 b
