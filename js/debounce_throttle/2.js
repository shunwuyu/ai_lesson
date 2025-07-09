function curry(fn) {
  // 获取原函数的参数长度
  const argLen = fn.length;
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments)
    const allArgs = [...presetArgs, ...restArgs]
    if (allArgs.length >= argLen) {
      // 如果参数够了，就执行原函数
      return fn.apply(this, allArgs)
    } else {
      // 否则继续柯里化
      return curry.call(null, fn, ...allArgs)
    }
  }
}

function fn(a, b, c) {
  return a + b + c;
}
var curried = curry(fn);
console.log(curried(1, 2, 3)); // 6
console.log(curried(1, 2)(3)); // 6
console.log(curried(1)(2, 3)); // 6
console.log(curried(1)(2)(3)); // 6
console.log(curried(7)(8)(9)); // 24
