/**
 * 柯里化（Currying）是一种将多个参数的函数转换为**多个嵌套的一元函数**（每个函数只接收一个参数）的技术。
 * 这样可以延迟计算、参数复用，并提高代码的可复用性。
 */

/**
 * 通用柯里化函数
 * @param {Function} fn - 需要被柯里化的目标函数
 * @param {...any} args - 用于存储部分应用参数
 * @returns {Function | any} - 若参数未满，返回一个新函数；若参数满足，执行原函数
 */
function curry(fn, ...args) {
    // 返回一个新的函数，继续接收参数
    return function curried(...newArgs) {
      // 合并已存储的参数和新传入的参数
      const allArgs = [...args, ...newArgs];
      
      // 判断当前参数数量是否已经达到目标函数所需参数个数
      if (allArgs.length >= fn.length) {
        // 若参数已满，执行原函数
        return fn.apply(this, allArgs);
      } else {
        // 若参数未满，返回一个新的柯里化函数，继续收集参数
        return curry(fn, ...allArgs);
      }
    };
  }
  
  /**
   * 示例：
   * 一个简单的加法函数
   */
  function add(a, b, c) {
    return a + b + c;
  }
  
  // 生成柯里化版本的 add 函数
  const curriedAdd = curry(add);
  
  // 逐步传参
  console.log(curriedAdd(1)(2)(3)); // 6
  console.log(curriedAdd(1, 2)(3)); // 6
  console.log(curriedAdd(1)(2, 3)); // 6
  