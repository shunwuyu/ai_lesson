// 依赖 c 模块
import { getMessage } from './c.js';

// ES 模块导出
export const bMessage = () => {
  return `B says: ${getMessage()}`;
};