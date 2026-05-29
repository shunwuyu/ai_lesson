# 你能介绍一下 TypeScript 的类型系统吗

TypeScript 是一门静态类型的语言，它在 JavaScript 的基础上引入了静态类型系统，从而提升了代码的可维护性和可读性。

- 基础类型： 包括 string、number、boolean、null、undefined、symbol、bigint 等，对应 JavaScript 的基本类型。
- 对象类型
    对象：{ name: string; age: number }
    数组：string[] 或 Array<string>
    函数：(x: number, y: number) => number
- 联合类型（Union）和交叉类型（Intersection）：
    联合：string | number 表示可以是 string 或 number
    交叉：A & B 用于合并多个类型的属性
- 字面量类型（Literal Types）：
    如 'GET' | 'POST' | 'PUT'，常用于严格限制值的范围
- 类型别名（Type Alias）和接口（Interface）：
    类型别名：type User = { name: string }
    接口：interface User { name: string }，支持继承和声明合并
- 泛型（Generics）：
    提高复用性，例如：function identity<T>(arg: T): T { return arg }
    常用于函数、类、接口的参数化设计
- 类型推断 & 类型守卫（Type Inference & Type Guards）：
    TS 会自动根据赋值推断类型
- 条件类型（Conditional Types）与映射类型（Mapped Types）：
    条件类型：T extends U ? X : Y
    映射类型：用于构造新类型，如 Partial<T>、Readonly<T>
- 实用类型（Utility Types）：
    TypeScript 内置的如 Partial<T>、Pick<T, K>、Record<K, T>、ReturnType<T> 等
- 类型保护（Type Narrowing）：
    结合 is 关键字，自定义类型守卫：function isString(x: unknown): x is string

## 你能结合案例解释一下 TypeScript 是如何推断函数返回值类型的吗？

TypeScript 会根据函数的返回表达式自动推断出返回值类型，也就是所谓的类型推断（Type Inference）。下面我用几个例子来说明。

function add(a: number, b: number) {
  return a + b;
}

const result: number = add(1, 2); // ✅


条件返回，TS 自动合并类型


function parseInput(input: string | number) {
  if (typeof input === 'string') {
    return input.toUpperCase();
  } else {
    return input.toFixed(2);
  }
}
使用泛型的推断
function identity<T>(value: T) {
  return value;
}

const result = identity('hello');

TypeScript 会基于函数体内的 return 表达式自动推断返回类型，在多数场景下都能准确识别，只有在复杂逻辑或需要精确控制时才建议显式标注。

## 如何显式地约束函数的参数类型？

function greet(name: string): string {
  return `Hello, ${name}`;
}