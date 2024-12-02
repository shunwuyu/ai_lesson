function objectFactory() {
  var obj = new Object()
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  
  // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况 null 也是object
  // 返回简单类型，还是obj
  return typeof ret === 'object' ? ret || obj : obj;
};

// 返回null
// function Person(name) {
//   this.name = name;
//   return null; // 显式返回 null
// }

// var person = objectFactory(Person, 'Alice');
// console.log(person); // { name: 'Alice' } - 因为返回 null，所以忽略返回值，返回新创建的对象

// 返回原始值
// function Person(name) {
//   this.name = name;
//   return 123; // 返回一个数字
// }

// var person = objectFactory(Person, 'Alice');
// console.log(person); // { name: 'Alice' } - 原始值被忽略，返回新创建的对象

// 返回对象
function Person(name) {
  this.name = name;
  return { name: 'Override' }; // 显式返回一个对象
}

var person = objectFactory(Person, 'Alice');
console.log(person); // { name: 'Override' } - 构造函数的返回值覆盖了新创建的对象