function function1(x, n) {
  let result = 1; // 注意：任何数的0次方都等于1
  for (let i = 0; i < n; i++) {
      result = result * x;
  }
  return result;
}

console.log(function1(2, 3))