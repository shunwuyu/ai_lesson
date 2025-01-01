// 如果 obj为 基本类型，直接返回
// 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
// 否则，JavaScript 抛出一个类型错误异常。

let objWithStringValue = {
  toString: function() {
      return "Hello";
  }
};

console.log(objWithStringValue + " world!"); // 输出: Hello world!

let objWithValueOf = {
  toString: function() {
      return this;
  },
  valueOf: function() {
      return 2;
  }
};

console.log(objWithValueOf + " world!"); // 输出: Hello world!

let objWithoutPrimitive = {
  valueOf: function() {
      return this; // 返回对象本身，不是一个原始值
  },
  toString: function() {
      return this; // 返回对象本身，不是一个原始值
  }
};

// 这行代码将会抛出 TypeError
console.log(objWithoutPrimitive + ""); 