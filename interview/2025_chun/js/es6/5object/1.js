const personProto = { greet() { return "Hello"; } };
const person = Object.create(personProto);
person.name = "John";
console.log(person, person.__proto__);

const pureObject = Object.create(null);
console.log(pureObject);