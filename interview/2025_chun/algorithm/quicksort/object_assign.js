// 示例1：基本类型的拷贝（不会相互影响）
console.log('示例1: 基本类型的拷贝');
const basicObj = { name: 'John', age: 30 };
const copyBasic = Object.assign({}, basicObj);

console.log('修改前：');
console.log('basicObj:', basicObj);
console.log('copyBasic:', copyBasic);

copyBasic.name = 'Jane';
copyBasic.age = 25;

console.log('\n修改后：');
console.log('basicObj:', basicObj);  // 原对象不变
console.log('copyBasic:', copyBasic); // 只有复制的对象改变

// 示例2：嵌套对象的拷贝（会相互影响）
console.log('\n示例2: 嵌套对象的拷贝');
const nestedObj = {
    name: 'John',
    age: 30,
    address: {
        city: 'Beijing',
        street: 'Wangfujing'
    },
    hobbies: ['reading', 'swimming']
};

const copyNested = Object.assign({}, nestedObj);

console.log('修改前：');
console.log('nestedObj:', JSON.stringify(nestedObj, null, 2));
console.log('copyNested:', JSON.stringify(copyNested, null, 2));

// 修改嵌套对象的属性
copyNested.address.city = 'Shanghai';  // 会影响原对象
copyNested.hobbies.push('gaming');     // 会影响原对象
copyNested.name = 'Jane';              // 不会影响原对象

console.log('\n修改后：');
console.log('nestedObj:', JSON.stringify(nestedObj, null, 2));
console.log('copyNested:', JSON.stringify(copyNested, null, 2));

// 示例3：多个对象合并
console.log('\n示例3: 多个对象合并');
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 }; // b 将覆盖 obj1 的值
const obj3 = { c: 5, d: 6 }; // c 将覆盖 obj2 的值

const merged = Object.assign({}, obj1, obj2, obj3);
console.log('merged:', merged); // { a: 1, b: 3, c: 5, d: 6 } 