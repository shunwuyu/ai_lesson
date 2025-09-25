async function demo() {
  console.log('A');
  console.log(await 1);   // 等价于 await Promise.resolve(1)
  console.log('B');
}
demo();
// 输出顺序：A → 1 → B
