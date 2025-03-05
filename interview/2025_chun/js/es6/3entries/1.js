// Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组。
// 每个键值对是一个包含两个元素的数组：第一个元素是键，第二个元素是值。
const obj = { a: 1, b: 2, c: 3 };

// 获取对象的所有键值对
const entries = Object.entries(obj);
console.log(entries); // [['a', 1], ['b', 2], ['c', 3]]

// 遍历键值对
entries.forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});