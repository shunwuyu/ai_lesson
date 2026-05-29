/**
 * 工具函数
 */

/**
 * 安全地将值转换为数字
 * @param {any} value
 * @param {number} defaultValue
 * @returns {number}
 */
function toNumber(value, defaultValue = 0) {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

/**
 * 安全地进行货币计算（避免浮点数精度问题）
 * @param {number} amount - 金额（以元为单位）
 * @returns {number} 金额（以分为单位）
 */
function toCents(amount) {
  return Math.round(toNumber(amount) * 100);
}

/**
 * 将分转换为元
 * @param {number} cents
 * @returns {number}
 */
function toYuan(cents) {
  return toNumber(cents) / 100;
}

/**
 * 安全的加法（处理浮点数精度）
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function safeAdd(a, b) {
  return toYuan(toCents(a) + toCents(b));
}

/**
 * 安全的减法
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function safeSubtract(a, b) {
  return toYuan(toCents(a) - toCents(b));
}

/**
 * 安全的乘法
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function safeMultiply(a, b) {
  return toYuan(Math.round(toCents(a) * toNumber(b)));
}

/**
 * 延迟函数
 * @param {number} ms
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 重试函数
 * @param {function} fn
 * @param {object} options
 * @returns {Promise<any>}
 */
async function retry(fn, options = {}) {
  const { maxAttempts = 3, delayMs = 1000, backoff = 2 } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        await delay(delayMs * Math.pow(backoff, attempt - 1));
      }
    }
  }

  throw lastError;
}

module.exports = {
  toNumber,
  toCents,
  toYuan,
  safeAdd,
  safeSubtract,
  safeMultiply,
  delay,
  retry
};