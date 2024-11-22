var arr = []
// console.log(typeof arr);
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
console.log(isArray(arr))
console.log(Array.isArray(arr)) // 建议使用
console.log(arr.constructor === Array)

function isArray(value) {
    return value instanceof Array;
}
console.log(isArray(arr))