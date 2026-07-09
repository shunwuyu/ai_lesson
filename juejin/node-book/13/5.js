// 引入文件系统模块
import fs from 'fs';

// 使用 fs.appendFileSync() 方法向指定文件追加内容
// 参数1：指定文件路径
// 参数2：要追加的内容
fs.appendFileSync('test.txt', 'Hello World2!');
