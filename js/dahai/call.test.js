// 引入待测试的文件
const { call2 } = require('./call');

// 测试函数
function testFunction(a, b, c) {
  return a + b + c;
}

// 测试用例 1: 正常传入上下文和参数
console.log('测试用例 1: 正常传入上下文和参数');
const context1 = { name: 'test1' };
const result1 = testFunction.call2(context1, 1, 2, 3);
console.log('预期结果:', 6);
console.log('实际结果:', result1);

// 测试用例 2: 不传入上下文，使用默认的全局上下文
console.log('\n测试用例 2: 不传入上下文，使用默认的全局上下文');
const result2 = testFunction.call2(undefined, 4, 5, 6);
console.log('预期结果:', 15);
console.log('实际结果:', result2);

// 测试用例 3: 上下文为 null
console.log('\n测试用例 3: 上下文为 null');
const result3 = testFunction.call2(null, 7, 8, 9);
console.log('预期结果:', 24);
console.log('实际结果:', result3);