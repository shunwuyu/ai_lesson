// 纯函数是指在相同的输入下总是返回相同的结果，并且不会产生任何副作用（如修改外部状态、网络请求、打印日志等）。
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 输出: 5
console.log(add(2, 3)); // 输出: 5
// 非纯函数是指其结果可能依赖于或影响外部状态，或者具有不可预测的行为（例如，依赖时间、随机数生成器等）。
// 非纯函数（Impure Function）
// 修改外部状态
let counter = 0;

function incrementCounter() {
  counter += 1;
  return counter;
}

console.log(incrementCounter()); // 输出: 1
console.log(incrementCounter()); // 输出: 2
// 依赖外部状态
const numbers = [1, 2, 3];

function getRandomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

console.log(getRandomNumber()); // 输出可能是 1, 2 或 3
console.log(getRandomNumber()); // 输出可能是 1, 2 或 3
// 依赖时间
// 依赖于系统时间，因此每次调用时结果都可能不同
function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

console.log(getCurrentTime()); // 输出当前时间
setTimeout(() => console.log(getCurrentTime()), 1000); // 一秒钟后输出当前时间