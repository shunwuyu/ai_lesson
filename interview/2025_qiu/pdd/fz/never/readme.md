- ts 判断类型不为 never
  先说明 never 的概念
  never 表示“永不发生”的类型，常用于函数抛出异常或无限循环。
  never 是所有类型的子类型，表示“无值”。

  // 1. 函数永远不返回
function error(): never {
  throw new Error("报错");
}

// 2. 死循环
function loop(): never {
  while (true) {}
}

T 是 never 时，[T] extends [never] 为 true，所以返回 false；
否则返回 true。

type IsNever<T> = [T] extends [never] ? true : false

// 测试
type A = IsNever<string>;  // true
type B = IsNever<never>;   // false

- ts 推断函数返回的数据类型
  理解 TypeScript 推断函数返回的数据类型，其核心就是 TS 能根据函数体自动推导出返回值类型，而不需要你显式声明

  function sum(a: number, b: number) {
    return a + b
  }

  TS 自动分析 return a + b，得出返回类型 number
  即便没有写 : number，函数也有类型

type SumReturn = ReturnType<typeof sum>


