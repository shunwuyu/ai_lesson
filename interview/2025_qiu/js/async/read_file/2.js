const fs = require('fs');

console.log('开始读取文件（同步）...');

try {
  const data = fs.readFileSync('hello.txt', 'utf8');
  console.log('同步读取结果:', data);
} catch (err) {
  console.error('读取失败:', err);
}

console.log('同步读取完成（这行在结果之后执行）');