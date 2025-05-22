const str = "abc123xyz";
const regex = /\d+/; // 匹配数字
console.log(str.match(regex));     // ['123']

str.replace(/\d+/, "***"); 

const phoneRegex = /^1[3-9]\d{9}$/;

// 测试示例
const phone1 = "13812345678";
const phone2 = "19912345678";
const phone3 = "12345678";  // 无效号码

console.log(phoneRegex.test(phone1));  // true
console.log(phoneRegex.test(phone2));  // true
console.log(phoneRegex.test(phone3));