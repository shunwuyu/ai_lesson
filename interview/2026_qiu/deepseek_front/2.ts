// `T` 必须是字符串类型
// **条件类型的判断分支，同时是**模板字面量模式匹配
// infer 捕获 never 这个输入不合法
// tsc 2.ts --noEmit 只做类型检查，不产出 js
type GetId<T extends string> = T extends `user-${infer Id}` ? Id : never;

type A = GetId<"user-12345">; // "12345"
type B = GetId<"admin-001">;  // never  不是user- 

const a: A = "12345";
const b: B = "001"; // ❌ 报错，不是user- 