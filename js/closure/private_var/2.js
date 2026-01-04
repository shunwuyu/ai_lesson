function memoize(fn) {
  // 利用闭包保存 cache 对象，实现跨调用持久化缓存。
  const cache = {};

  return function(...args) {
    // 参数序列化为缓存键（简单场景可用 JSON.stringify）。
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// 被记忆化的函数：计算 a 的 b 次方
function power(a, b) {
  console.log(`计算 ${a}^${b}`); // 用于观察是否真的被缓存
  return Math.pow(a, b);
}

const memoizedPower = memoize(power);

console.log(memoizedPower(2, 3)); // 输出 "计算 2^3"，结果 8
console.log(memoizedPower(2, 3)); // 直接返回缓存结果，不再打印日志
console.log(memoizedPower(5, 2)); // 输出 "计算 5^2"，结果 25