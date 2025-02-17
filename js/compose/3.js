// compose 函数也只是能支持两个参数，如果有更多的步骤呢？
/**
 * 组合多个函数为一个新的函数，新函数将从右到左依次执行传入的函数。
 * 
 * @returns {Function} 返回一个新的函数，该函数将按顺序执行所有传入的函数。
 */
function compose() {
  // 将所有传入的函数参数存储在 args 数组中
  var args = arguments;
  // 由于函数组合是从右到左执行，所以从最后一个函数开始，获取最后一个函数的索引
  var start = args.length - 1;
  // 返回一个新的函数，该函数将执行所有传入的函数
  return function() {
      // 初始化计数器 i，指向最后一个函数的索引
      var i = start;
      // 调用最后一个函数，并将传入新函数的参数传递给它，将结果存储在 result 中
      var result = args[start].apply(this, arguments);
      // 从倒数第二个函数开始，依次调用每个函数，并将前一个函数的结果作为参数传递给下一个函数
      while (i--) result = args[i].call(this, result);
      // 返回最后一个函数的结果
      return result;
  };
};
