// // Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person
// function Person() {

// }

// var person = new Person();
// person.name = '陈伟鸿';
// console.log(person.name) // Kevin

function Person(name) {
  this.name = name;
}

var person = new Person('陈伟鸿');
// person.name = '陈伟鸿';
console.log(person.name) 
console.log(Person.prototype)