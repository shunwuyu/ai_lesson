"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 正确写法（Node 内置模块通用）
var fs = require("fs");
var path = require("path");
// 写入文件
var filePath = path.join(__dirname, 'test.txt');
fs.writeFileSync(filePath, '我是 Node 内置模块写入的内容');
console.log('成功！路径：', filePath);
