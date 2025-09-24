有字符串 var = 'abc345efgabcab'，请写出 3 条 JS 语句分别实现如下 3 个功能（使用正则）： 1）去掉字符串中的a、b、c 字符，形成结果：'345efg' 2）将字符串中的数字用中括号括起来，形成结果：'abc[345]efgabcab' 3）将字符串中的每个数字的值分别乘以 2，形成结果：'abc6810efgabcab'

- 去掉 a、b、c 三个字符

let res1 = str.replace(/[abc]/g, '');
console.log(res1); // '345efg'

- 给连续数字加中括号

  let res2 = str.replace(/\d+/g, '[$&]');
console.log(res2);

- 每个数字单独 ×2
let res3 = str.replace(/\d/g, m => m * 2);
console.log(res3);