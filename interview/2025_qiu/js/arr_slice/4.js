const arr = Array.from({ length: 10 }, (_, i) => i + 1);
const [, , , , , ...rest] = arr; // 解构跳过前 5 个
const result = arr.slice(0, 4).concat(rest);
console.log(result); // [1,2,3,4,6,7,8,9,10]
// 展示你对 解构 + slice/concat 的灵活运用