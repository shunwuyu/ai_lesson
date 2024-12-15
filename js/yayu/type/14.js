// 定义一个带有自定义 valueOf 和 toString 方法的对象
let specialObj = {
  valueOf: function() {
      console.log('Calling valueOf...');
      return 123; // 返回一个数字（原始值）
  },
  toString: function() {
      console.log('Calling toString...');
      return "456"; // 返回一个字符串（原始值）
  }
};

// 使用 ToPrimitive 暗示类型为 Number 的场景
console.log(Number(specialObj)); // 输出: Calling valueOf... 123

// 定义另一个对象，其 valueOf 不返回原始值
let objWithoutPrimitiveValueOf = {
  valueOf: function() {
      console.log('Calling valueOf...');
      return this; // 返回对象本身，不是一个原始值
  },
  toString: function() {
      console.log('Calling toString...');
      return "789"; // 返回一个字符串（原始值）
  }
};

console.log(Number(objWithoutPrimitiveValueOf)); // 输出: Calling valueOf... Calling toString... 789

// 定义一个对象，其 valueOf 和 toString 都不返回原始值
let problematicObj = {
  valueOf: function() {
      console.log('Calling valueOf...');
      return {}; // 返回一个空对象，不是一个原始值
  },
  toString: function() {
      console.log('Calling toString...');
      return {}; // 返回一个空对象，不是一个原始值
  }
};

// 这行代码将会抛出 TypeError
try {
  console.log(Number(problematicObj));
} catch (e) {
  console.error(e); // 抛出 TypeError
}