// 纯函数
function add(a, b) {
  return a + b;
}

// 非纯函数（有副作用）
let total = 0;
function addToTotal(a) {
  total += a; // 修改外部变量
  return total;
}

// reducer 就必须是个纯函数。