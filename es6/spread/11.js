let person = { name: '布兰' }
person = {
    ...person, 
    get age() { return 12 }
}
console.log(person.age)  // 12
