// 1. 数组的浅拷贝
console.log('=== 数组的扩展运算符浅拷贝 ===');
const originalArray = [
    1,
    { name: 'John' },
    [2, 3],
    { hobbies: ['reading', 'gaming'] }
];

// 使用扩展运算符进行浅拷贝
const spreadCopy = [...originalArray];

console.log('修改前：');
console.log('原数组:', JSON.stringify(originalArray, null, 2));
console.log('扩展运算符拷贝:', JSON.stringify(spreadCopy, null, 2));

// 修改拷贝数组中的值
spreadCopy[0] = 100;                     // 基本类型：不会影响原数组
spreadCopy[1].name = 'Jane';             // 对象：会影响原数组
spreadCopy[2].push(4);                   // 嵌套数组：会影响原数组
spreadCopy[3].hobbies.push('swimming');  // 嵌套对象中的数组：会影响原数组

console.log('\n修改后：');
console.log('原数组:', JSON.stringify(originalArray, null, 2));
console.log('扩展运算符拷贝:', JSON.stringify(spreadCopy, null, 2));

// 2. 对象的浅拷贝
console.log('\n=== 对象的扩展运算符浅拷贝 ===');
const originalObject = {
    name: 'John',
    age: 30,
    address: {
        city: 'Beijing',
        street: 'Wangfujing'
    },
    hobbies: ['reading', 'gaming'],
    friend: { name: 'Tom' }
};

// 使用扩展运算符进行对象的浅拷贝
const spreadObjectCopy = { ...originalObject };

console.log('修改前：');
console.log('原对象:', JSON.stringify(originalObject, null, 2));
console.log('扩展运算符拷贝:', JSON.stringify(spreadObjectCopy, null, 2));

// 修改拷贝对象中的值
spreadObjectCopy.name = 'Jane';                  // 基本类型：不会影响原对象
spreadObjectCopy.address.city = 'Shanghai';      // 嵌套对象：会影响原对象
spreadObjectCopy.hobbies.push('swimming');       // 数组：会影响原对象
spreadObjectCopy.friend.name = 'Jerry';          // 嵌套对象：会影响原对象

console.log('\n修改后：');
console.log('原对象:', JSON.stringify(originalObject, null, 2));
console.log('扩展运算符拷贝:', JSON.stringify(spreadObjectCopy, null, 2));

// 3. 验证引用关系
console.log('\n=== 引用关系验证 ===');
console.log('原数组和拷贝的嵌套数组是否指向同一引用:', originalArray[2] === spreadCopy[2]);  // true
console.log('原对象和拷贝的address是否指向同一引用:', originalObject.address === spreadObjectCopy.address);  // true
console.log('原对象和拷贝的hobbies是否指向同一引用:', originalObject.hobbies === spreadObjectCopy.hobbies);  // true
