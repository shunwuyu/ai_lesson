const buf = Buffer.from('Hello, world!');
const buf2 = buf.slice(0, 5);
console.log(buf2.toString()); // 输出 'Hello'