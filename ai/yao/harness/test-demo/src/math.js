// src/math.js

/**
 * 两数相加
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function add(a, b) {
  // 校验参数类型：如果 a 或 b 不是数字类型，则抛出类型错误
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('add 函数的参数必须都是数字 (number)');
  }

  return a + b;
}

// 导出函数以便测试
module.exports = { add };