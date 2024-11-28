let myVariable = null;
console.log(myVariable); // 输出: null
 
let largeObject = {
    data: new Array(1000000).fill('a') // 创建一个包含一百万个 'a' 的数组
};
// 不存在的对象 垃圾回收
largeObject = null;