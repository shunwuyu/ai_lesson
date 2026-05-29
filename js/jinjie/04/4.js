// 定义一个字符串
let str = "hello world";

// 创建一个正则表达式，匹配 "hello"（不区分大小写）
let regex = /hello/;
// let regex = /hello/i;

// 使用 test() 方法进行测试
let result = regex.test(str);

console.log(result); // 输出: true

console.log(/world/.test("hello world")); // true
console.log(/abc/.test("xyz"));           // false
console.log(/[0-9]/.test("abc123"));     // true（是否含有数字）
console.log(/^\d+$/.test("12345"));      // true（是否全是数字）
console.log(/^\d+$/.test("12345ss"));  
// 定义一个手机号字符串
let phone = "13812345678";

// 创建正则表达式
// 说明：
// - 以1开头
// - 第二位是3、4、5、7、8、9中的一个
// - 总共11位数字
let regex = /^[1][3-57-9]\d{9}$/;

// 使用 test() 方法进行测试
let isValid = regex.test(phone);

console.log(isValid); // 输出: true 或 false

function formatWithNamedPlaceholders(template, data) {
    return template.replace(/\$\{(\w+)\}/g, (_, key) => data[key] ?? '');
}
  
const tpl = "您好，${name}，您今天的积分是${points}分。";
const formatted = formatWithNamedPlaceholders(tpl, { name: "张三", points: 120 });
console.log(formatted); // 输出: 您好，张三，您今天的积分是120分。
  