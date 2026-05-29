let arr = [1,2,3];
const date = new Date();
function fn(arr) {
}
console.log(typeof arr);
console.log(typeof date);
console.log(Object.prototype.toString.call(arr));
console.log(Object.prototype.toString.call(fn));
console.log(Object.prototype.toString.call(date));
// 8 第8个开始， -1 倒数第一个之前
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

console.log(getType(arr));


