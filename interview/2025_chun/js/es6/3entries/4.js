const obj = { a: 1, b: 2, c: 3 };
// 虽然 Map 不是直接用于对象的操作，但你可以将对象转换为 Map 对象，并利用其特性进行键值对的操作。
// 将对象转换为 Map
// ES6 的 Map 是一个键值对数据结构，支持任意类型的键，并提供了高效的增删查操作及便利的迭代方法。
const map = new Map(Object.entries(obj));

// 遍历 Map
map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// 或者使用 for...of 循环
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}