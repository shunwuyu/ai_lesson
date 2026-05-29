// - never、any 和 unknown 是 TypeScript 中非常核心也容易混淆的三个特殊类型。

// any 代表任意类型，是最宽松的类型，关闭了类型检查，使用它意味着放弃了 TypeScript 的类型保护。
// let value: any;
// value = 123;
// value = 'hello';
// value.toFixed(); 

// 2. unknown：也是任意类型的“兄弟”，但更安全。TS 不允许你直接对 unknown 类型的值进行操作，必须先做类型缩小（类型断言或判断）。

// let value: unknown = 'hello';
// // value.toUpperCase(); // ❌ 报错
// if (typeof value === 'string') {
//   value.toUpperCase(); // ✅
// }

// 3. never：
// 表示永远不会发生的值，用于：

// 抛出异常的函数；

// 死循环；

// 不可达的分支；
// 函数永远不会返回任何值，TS 会推断为 never。这是 void 的更严格版本。
function throwError(message: string): never {
    throw new Error(message);
}
  
function infiniteLoop(): never {
    while (true) {}
}
  