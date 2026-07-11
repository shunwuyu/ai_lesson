console.log(globalThis == global)
console.log(global.console)
global.userInfo = {
    name: 'xm',
    age: 18
}
console.log(userInfo)

console.log(Object.getOwnPropertyNames(global));

const obj = {
  hometown: '江西'
}

const person = {
  name: "张三",
  age: 20
};

person.__proto__ = obj

Object.defineProperty(person, "secret", {
  value: 123456,
  enumerable: false // 不可枚举
});


person[Symbol()] = 1001;
person[Symbol()] = 1002;
// 1. Object.keys 只拿可枚举属性
console.log(Object.keys(person)); // [ 'name', 'age' ]
// 2. Object.getOwnPropertyNames 可以拿到所有属性，包括不可枚举的
console.log(Object.getOwnPropertyNames(person)); // [ 'name', 'age', 'secret' ] 

const arr = [10, 20];
console.log(Object.keys(arr)); // ['0','1'] 取不到 length
console.log(Object.getOwnPropertyNames(arr)); // ['0','1','length']
// 可以看到 length 也是不可枚举的
console.log(person.hometown) // 江西
// 遍历自身可枚举属性 + 原型链上面可枚举的属性；会跳过不可枚举属性
for (let key in person) {
  console.log(key)
}
// 3. Object.getOwnPropertySymbols 可以拿到所有 Symbol 类型的属性
console.log(Object.getOwnPropertySymbols(person))
// 4. Reflect.ownKeys 可以拿到所有属性，包括不可枚举的, symbol 类型的属性也会被返回
// 不会包含原型链上的属性
// Reflect 反射 好比对象的 遥控器 
// 不直接动手操作对象（ obj.key ），而是通过遥控器统一按键
console.log(Reflect.ownKeys(person));