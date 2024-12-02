let p1 = { name: '布兰' }
let p2 = { age: 12 }
// let p3 = Object.assign({}, p1, p2)
// console.log(p3)  // { name: '布兰', age: 12}

let p3 = { ...p1, ...p2 }
console.log(p3)
