function function4(x, n) {
  // 推出条件
  if (n === 0) {
      return 1;
  }
  // 计算 x 的 n/2 次幂 
  // 每次递归调用都将问题规模减半 O(logN)
  let t = function4(x, Math.floor(n / 2));
  if (n % 2 === 1) {
      return t * t * x;
  }
  // 当n为偶数时 x^n =(x^n/2)^2 = x^n/2 * x^n/2  
  return t * t;
}

console.log(function4(2, 3))