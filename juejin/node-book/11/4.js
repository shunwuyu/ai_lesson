// Buffer
// Buffer 用于处理二进制数据。类似于数组，并提供了一些方便的方法来操作二进制数据。
// 创建buffer 对象
const buf = Buffer.alloc(10); // 创建一个大小为 10 的 Buffer 对象，默认会用 0 填充
const buf2 = Buffer.from('Hello, world!'); // 创建一个包含字符串 'Hello, world!' 的 Buffer 对象
const buf3 = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]); // 内容为hello构成的16进制数组 Buffer 对象 
console.log(buf)
console.log(buf2)
console.log(buf3)

// 转为字符串输出
console.log(buf2.toString()); 
// 转为16进制字符串输出
console.log(buf2.toString('hex')); // 输出 '48656c6c6f2c20776f726c6421'（对应的是 'Hello, world!' 的 ASCII 码）
// 转为数组输出 十进制
console.log(Array.from(buf2)); 