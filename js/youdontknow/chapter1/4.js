"use strict"; // 启用严格模式

function foo() {
  // 我们启用了严格模式。 当引擎执行 foo() 函数内部的 b = 2 时，它会像之前一样进行 LHS 查询。 但是由于是在严格模式下，当 LHS 查询在所有作用域中都找不到 b 时，引擎不会自动创建全局变量，而是会抛出 ReferenceError 异常，表示无法找到 b 的引用。
  b = 2; // LHS 查询失败，抛出 ReferenceError
}

foo();