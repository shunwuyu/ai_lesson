// 阶乘
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * arguments.callee(n - 1);
}

console.log(factorial(5)); // 输出: 120