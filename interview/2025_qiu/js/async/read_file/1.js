const fs = require('fs');

console.log('开始读取文件（异步）...');

fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取失败:', err);
    return;
  }
  console.log('异步读取结果:', data);
});

console.log('异步调用已发起（这行会先执行）');