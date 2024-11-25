function objectFactory() {
  var obj = new Object() // 新对象
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  return  obj;
};

function person(name, age) {
  this.name = name
  this.age = age
}

let p = objectFactory(person, '布兰', 12)
console.log(p)  // { name: '布兰', age: 12 }

