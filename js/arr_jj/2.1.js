function createArray(...params) {
    return new Array(...params);
}

console.log(createArray(5));
console.log(createArray(5, 6));
// 不再建议使用 Array 构造器，而是推荐用静态方法
console.log(Array.of(5, 6, 7) );
// 生成一个数组，包含有序的 26 个大写英文字母。
// Array.from() 的第二个参数是一个 mapper 函数，用来把每一项数据做一个映射。
console.log(Array.from(new Array(26), (val, index) => String.fromCodePoint(65 + index)));
// Array.from() 常常用来把一个类数组、同步迭代对象转换为数组，
// 如果数组的每一项都是同一个值，那么可以用数组实例的 fill() 
// 函数来填充，否则的话，Array.from() 是一个更好的方案。

