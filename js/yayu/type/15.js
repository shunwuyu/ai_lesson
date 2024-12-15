let objWithStringValue = {
  toString: function() {
      return "Hello";
  }
};

console.log(objWithStringValue + " world!"); // 输出: Hello world!

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