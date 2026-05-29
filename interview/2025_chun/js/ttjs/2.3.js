// 对象转原始类型的顺序
// 对于普通对象，优先调用 valueOf()，如果返回原始值（如数字、字符串），就用它；否则再调用 toString()。
// fn.valueOf() 被重写，返回数字
// fn.toString() 被重写，返回数字 10（但不会用到，因为 valueOf 已返回原始值）。
// 加法运算
function fn() {
    return 20;
}

fn.toString = function() {
    return 10;
}

fn.valueOf = function() {
    return 5;
}

console.log(fn + 10); 
