let myname = '康总'

// console.log('Hello, I am' + myname);
// 使用反引号 ` 包裹的字符串是 模板字符串
// ${myname} 是插值表达式，
// 会将变量 myname 的值（'康总'）插入到字符串中。
// console.log(`Hello, I am ${myname}`);

// for...of 是 ES6 引入的循环语法，用于遍历可迭代
// 对象（如数组、字符串、Set、Map 等）。
for (let x of myname) {
  console.log(x);
}