var obj = {};
Object.defineProperty(obj, "num", {
    value : 1,
    // configurable : false
    configurable : true,
});
obj.num = 2
console.log(obj.num, '///////')
delete obj.num
console.log(obj.num)