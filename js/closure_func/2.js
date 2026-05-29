function memoize(fn) {
  const cache = {};

  return function (...args) {
    // 把参数转成字符串作为 key（简单场景）
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log('缓存命中:', key);
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const fib = memoize(function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // 递归调用的是 memoized 版本！
});

console.log(fib(100))

