// memoize 函数：用于对传入的函数 f 进行记忆化（缓存）处理，
// 以避免对相同输入重复执行昂贵的计算。
function memoize(f) {
  // 创建一个对象作为缓存容器，用于存储已计算过的参数组合及其结果
  var cache = {};

  // 返回一个新的包装函数（闭包），它将替代原函数 f 被调用
  return function() {
      // 生成缓存键（key）：
      // 将 arguments 对象转换为字符串形式的唯一标识。
      // 方法：先取参数个数（arguments.length），
      // 再用 Array.prototype.join.call 将所有参数用逗号连接成字符串。
      // 例如：调用 f(1, 2) → key = "21,2"
      // 注意：这种键生成方式在某些边界情况下可能不安全（如参数包含逗号或对象），但对简单类型有效。
      var key = arguments.length + Array.prototype.join.call(arguments, ",");

      // 检查缓存中是否已有该参数组合的结果
      if (key in cache) {
          // 如果有，直接返回缓存的结果，避免重复计算
          return cache[key];
      } else {
          // 如果没有，则调用原始函数 f，传入当前上下文（this）和所有参数，
          // 并将计算结果存入缓存，同时返回该结果
          return cache[key] = f.apply(this, arguments);
      }
  };
}