// 正确写法（Node 内置模块通用）
import * as fs from 'fs';
import * as path from 'path';

// 写入文件
const filePath = path.join(__dirname, 'test.txt');
fs.writeFileSync(filePath, '我是 Node 内置模块写入的内容');

console.log('成功！路径：', filePath);