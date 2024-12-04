let person = { name: '布兰' }
// person.age = 12
// console.log(person)
person = {...person, age: 12}
console.log(person) 

// 给新对象设置默认值：
// let person = {age: 12, ...{ name: '布兰' } }
// 重写对象属性
// person = {...person, age: 20 }