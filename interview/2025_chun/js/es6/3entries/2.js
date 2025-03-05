// for...in 循环可以遍历对象的所有可枚举属性，包括继承的属性
// （除非使用 hasOwnProperty 进行过滤）。
const obj = { a: 1, b: 2, c: 3 };

for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(`${key}: ${obj[key]}`);
    }
}