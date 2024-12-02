let person = { name: '布兰', age: 12}
// let p2 = Object.assign({}, person)
// person.age = 20
// console.log(person)  // { name: '布兰', age: 20 }
// console.log(p2)      // { name: '布兰', age: 12 }

let p3 = {...person}
console.log(p3)
person.age = 20
console.log(person)