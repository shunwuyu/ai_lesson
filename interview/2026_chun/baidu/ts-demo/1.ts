// function print(value: string | number) {
//     value.length //❌ 报错
// }

// 怎么解决？
// function print(value: string | number) {
//     // 使用 typeof 进行类型守卫
//     if (typeof value === 'string') {
//         // 在这个代码块中，TypeScript 知道 value 是 string 类型
//         console.log(value.length); // ✅ 正确
//     } else {
//         // 在这个代码块中，value 被收窄为 number 类型
//         console.log(value.toFixed(2)); // ✅ 正确
//     }
// }

// function print(value: string | number) {
//     // 使用 'as' 语法断言为 string
//     console.log((value as string).length); // ⚠️ 不推荐，如果 value 是数字会出错
// }

// T 必须 extends (继承) 具有 length 属性的类型
function print<T extends { length: number }>(value: T) {
    console.log(value.length); // ✅ 正确
}

print("hello"); // ✅ 合法
print([1, 2, 3]); // ✅ 合法
// print(123); // ❌ 报错：数字没有 length 属性