Array.prototype.map2 = function(callback, thisArg) {
  if (this == null) {
      throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function')
  }
  // Object(this)：在 JavaScript 中，Object 构造函数可以将任意值转换为对象。
  // 这里的 this 指向调用 map2 方法的数组实例。使用 Object(this) 是为了确保
  // 我们操作的是一个对象，即使 this 是原始值（如字符串、数字等），也会将其转换
  // 为对应的包装对象。这样做的目的是为了统一处理，避免因 this 不是对象而导致
  // 后续操作出错。
  const O = Object(this)
  // O.length：获取对象 O 的 length 属性值，对于数组来说，这个值代表数组的长度。
  // >>> 0：这是一个无符号右移操作符。它的作用是将一个值转换为 32 位无符号整数。
  // 在 JavaScript 中，数组的 length 属性必须是一个 32 位无符号整数，
  // 使用 >>> 0 可以确保 len 是一个有效的数组长度值。如果 O.length 
  // 是一个负数、小数或者非数字值，经过 >>> 0 操作后，会将其转换为合法的
  //  32 位无符号整数。
  const len = O.length >>> 0
  let k = 0, res = []
  while (k < len) {
      if (k in O) {
           res[k] = callback.call(thisArg, O[k], k, O);
      }
      k++;
  }
   return res
}

// 定义一个数组
const numbers = [1, 2, 3, 4];

// 定义一个回调函数，用于将数组中的每个元素乘以 2
const multiplyByTwo = function(element, index, array) {
    return element * 2;
};

// 使用 map2 方法调用回调函数
const result = numbers.map2(multiplyByTwo);