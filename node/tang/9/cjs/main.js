console.log('main.cjs start');
const { add } = require('./math.js'); 
// 运行时动态加载，可出现在任意位置
console.log('2 + 3 =', add(2, 3));