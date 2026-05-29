// main.mjs
console.log('main.mjs start');
import { add } from './math.mjs'; // 静态声明，必须在顶层，解析阶段确定依赖
console.log('2 + 3 =', add(2, 3));

// CJS:
// - require() 是函数调用，在代码执行到该行时才加载模块（运行时）

// ESM:
// - import 是静态语法，在代码执行前（解析阶段）就完成依赖分析和加载