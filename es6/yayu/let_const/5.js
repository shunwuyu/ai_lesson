// var a = 1; // es5
// let b = 2; // es6 2015年后
// 编译（执行前，语法检测） 变量提升
// if (false) {
//     var value = 1;
// }
// console.log(value);
// 代码相当于

var value;
if (false) {
    value = 1;
}
console.log(value);

for (var i = 0; i < 10; i++) {

}
console.log(i);