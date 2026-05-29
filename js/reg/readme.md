# 正则
正则表达式是一种用于匹配、查找和操作字符串的强大工具，通过特定的语法规则描述文本模式。
- 手机号校验
合法的中国大陆手机号
const phoneRegex = /^1[3-9]\d{9}$/;
// ^       : 必须以此开头
// 1       : 第一位必须是 1
// [3-9]   : 第二位必须是 3到9 之间的数字
// \d{9}   : 后面紧跟 9 个数字 (digits)
// $       : 必须以此结尾
console.log(phoneRegex.test("13812345678")); // true
console.log(phoneRegex.test("138123456789")); // false (太长)
console.log(phoneRegex.test("23812345678")); // false (不是1开头)