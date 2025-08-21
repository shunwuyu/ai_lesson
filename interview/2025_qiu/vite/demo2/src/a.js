// 依赖 b 模块
import { bMessage } from './b.js';

// // 入口模块
// console.log(bMessage());
// console.log('/////')

export const aMessage = () => {
    return bMessage();
}