console.log("a".length)
console.log("中".length);
// JS 内部用 UTF-16 存储，常规字符用一个 16 位单元表示，
// 但像 emoji、某些生僻字需要两个 16 位
console.log("𝄞".length)

const str = " Hello, 世界! 👋  ";
console.log(str.length);
// 访问字符
console.log(str[1])
console.log(str.charAt(1))
// 截取 获得Hello
console.log(str.slice(1,6))
console.log(str.substring(1,6))

let str2 = "hello";

// 1. 处理负数索引：slice 支持，substring 不支持
console.log(str2.slice(-3, -1));     // "ll" (从倒数第3个到倒数第1个)
console.log(str2.substring(-3, -1)); // "" (负数被当作 0，相当于 substring(0,0))

// 2. 参数顺序：slice 保持顺序，substring 自动调整
console.log(str2.slice(3, 1));       // "" (从索引3开始到1结束，不包含，为空)
console.log(str2.substring(3, 1));   // "el" (自动把小的当起点，大的当终点，相当于 substring(1,3))

// slice 支持负数索引（从末尾计算），且不会交换参数顺序
// substring 遇到负数会当作 0，并且如果第一个参数大于第二个，会自动交换两者位置。

// 查找
console.log(str.indexOf("世"))  // 8
console.log(str.lastIndexOf("l"))// 最后一次出现
console.log(str.includes("Hello")) // true
console.log(str.startsWith(" ")) // true
console.log(str.endsWith(" "))   // true

// 大小写
"abc".toUpperCase() // "ABC"
"İ".toLowerCase()   // 注意语言差异（i / İ）
// 去空白
console.log(str.trim())       // 去除两端空白
console.log(str.trimStart())  // s.trimLeft()
console.log(str.trimEnd())    // s.trimRight()

// 重复与填充
"x".repeat(3) 
// 如果当前字符串长度不足 3，则在开头用 '0' 填充，直到总长度达到 3
console.log("1".padStart(3,'0'));

// 切分/合并
"a,b,c".split(",")
["a","b"].join("|")

// 替换
// 正则表达式就像一套“搜索指令”，用来描述你想要查找的文本模式，
// 比如“所有以数字开头的电话号码”或“包含@符号的邮箱”。
"hello world".replace("world", "JS")
"aba".replace("a","x") 
"aba".replace(/a/g,"x")
"aba".replaceAll("a","x")

const s = "John: 23, Mary: 30";
s.replace(/(\w+): (\d+)/g, (match, name, age) => {
  return `${name.toLowerCase()}: ${parseInt(age)+1}`;
});

// 模板字符串
const name = "Andrew";
const age = 30;
const str5 = `Hi ${name}, you are ${age} years old.`;
// 支持表达式：
`2 + 3 = ${2+3}` // "2 + 3 = 5"
// 多行：
const multi = `line1
line2`
// 原始字符串：String.raw
String.raw`C:\path\${name}` 

// 反转字符串
function reverseBad(s){ return s.split('').reverse().join(''); }

reverseBad("hello"); 