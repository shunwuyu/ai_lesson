var obj = {};
// 对象属性描述符 
// 禁止重新配置 - 该属性不能被重新定义或删除
Object.defineProperty(obj, "num", {
    value : 1,
    // 该属性描述符才能够被改变，也能够被删除
    // configurable : false
    configurable : true,

});
obj.num = 2
console.log(obj.num, '///////')
delete obj.num
console.log(obj.num)