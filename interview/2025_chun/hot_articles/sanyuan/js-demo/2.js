const Person = function() {}
const p1 = new Person()
console.log(p1 instanceof Person) // true
// str1 是一个原始字符串（primitive string），不是对象
var str1 = 'hello world'
// str1 是原始类型，不走原型链，因此 instanceof String 为 false。
console.log(str1 instanceof String) // false
// str2 是一个用 String 构造函数创建的String 对象
var str2 = new String('hello world')
console.log(str2 instanceof String) // true
console.log(typeof str2)
