//fn 是函数对象 转原始类型时，会优先调用 toString() 方法。
// 你重写了 fn.toString，让它返回数字 10
// 加法运算
function fn() {
    return 20;
}
fn.toString = function() {
    return 10;
}
console.log(fn + 10);  // 输出结果是多少？ 20