// 都是primitve  1.2 跳过
// 都不是字符串 3跳过
// Number(null) 0 
console.log(null + 1); // 1

// to primitive 在提示为字符串的情况下（加法可以是连接也可以是相加，
// 但通常对非数值类型来说，优先考虑连接），等价于调用 [].toString()
console.log([] + []);
// "" + "" 
// "" 拼接

// topromitive [] "" 
//  {} toPrimitive({}, number) [object object]
//  相当于调用 ToPrimitive({}, Number)，先调用 valueOf 方法
//  ，返回对象本身，因为不是原始值，调用 toString 方法，
//  返回 "[object Object]"
console.log([] + {}); // [object Object]

// [object Object][object Object]
console.log({} + {});