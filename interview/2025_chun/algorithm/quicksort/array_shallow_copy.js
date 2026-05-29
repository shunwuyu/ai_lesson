// 创建一个包含嵌套数组和对象的数组
const originalArray = [
    1,
    { name: 'John' },
    [2, 3],
    { hobbies: ['reading', 'gaming'] }
];

// 使用 concat() 方法进行浅拷贝
console.log('=== concat() 方法浅拷贝示例 ===');
const concatCopy = [].concat(originalArray);

console.log('修改前：');
console.log('原数组:', JSON.stringify(originalArray, null, 2));
console.log('concat拷贝:', JSON.stringify(concatCopy, null, 2));

// 修改拷贝数组中的值
concatCopy[0] = 100;                     // 基本类型：不会影响原数组
concatCopy[1].name = 'Jane';             // 对象：会影响原数组
concatCopy[2].push(4);                   // 嵌套数组：会影响原数组
concatCopy[3].hobbies.push('swimming');  // 嵌套对象中的数组：会影响原数组

console.log('\n修改后：');
console.log('原数组:', JSON.stringify(originalArray, null, 2));
console.log('concat拷贝:', JSON.stringify(concatCopy, null, 2));

// 使用 slice() 方法进行浅拷贝
console.log('\n=== slice() 方法浅拷贝示例 ===');
const sliceCopy = originalArray.slice();

// 继续修改 slice 拷贝的数组
sliceCopy[0] = 200;                      // 基本类型：不会影响原数组
sliceCopy[1].name = 'Tom';               // 对象：会影响原数组
sliceCopy[2].push(5);                    // 嵌套数组：会影响原数组
sliceCopy[3].hobbies.push('coding');     // 嵌套对象中的数组：会影响原数组

console.log('最终结果：');
console.log('原数组:', JSON.stringify(originalArray, null, 2));
console.log('slice拷贝:', JSON.stringify(sliceCopy, null, 2));

// 展示三个数组的引用关系
console.log('\n=== 引用关系验证 ===');
console.log('originalArray[2] === concatCopy[2]:', originalArray[2] === concatCopy[2]);  // true
console.log('originalArray[2] === sliceCopy[2]:', originalArray[2] === sliceCopy[2]);    // true
console.log('原数组和concat拷贝的hobbies是否指向同一数组:', originalArray[3].hobbies === concatCopy[3].hobbies);  // true
console.log('原数组和slice拷贝的hobbies是否指向同一数组:', originalArray[3].hobbies === sliceCopy[3].hobbies);    // true 