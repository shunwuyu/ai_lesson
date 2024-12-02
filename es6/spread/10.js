let person = { name: '布兰' }
Object.defineProperty(person, 'age', {
    get() { return 12 },
    enumerable: true,
    configurable: true
})
console.log(person.age)  // 12
