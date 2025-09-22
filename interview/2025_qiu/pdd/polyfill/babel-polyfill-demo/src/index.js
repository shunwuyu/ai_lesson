// 使用一些新 API
const arr = Array.from({ length: 3 }, (_, i) => i);
console.log(arr); // [0, 1, 2]

if (arr.includes(1)) {
  console.log('包含 1');
}