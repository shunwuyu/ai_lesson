// forEach使用return是不能中止循环的，或者说每
// 一次调用callback函数，终止的是当前的一次，
// 而不是整个循环。
const nums = [1, 2, 3, 4, 5, 6];
let firstEven;
nums.forEach(n => {
  if (n % 2 ===0 ) {
    firstEven = n;
    return n;
  }
});
console.log(firstEven); // 6
