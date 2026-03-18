// src/utils/eventBus.js
import mitt from 'mitt';

// 定义事件类型（可选，但推荐用于 TS 或代码提示）
// 如果是 JS 项目，可以忽略 types 部分，直接 export default mitt()
// const events = {
//   // 定义事件名和 payload 类型
//   'user-login': { name: string, id: number },
//   'theme-change': 'dark' | 'light',
//   'show-toast': ''
// };

// 创建 emitter 实例
const emitter = mitt();

export default emitter;