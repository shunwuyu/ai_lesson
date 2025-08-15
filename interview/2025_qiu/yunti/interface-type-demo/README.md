- 共同点
  interface 和 type 都可以：
  描述对象的结构
  用于函数参数、返回值
  给变量/对象做类型约束

```js
// interface 写法
interface User {
  name: string
  age: number
}

// type 写法
type UserType = {
  name: string
  age: number
}

const u1: User = { name: 'Alice', age: 20 }
const u2: UserType = { name: 'Bob', age: 22 }
```

<!-- 区别一：扩展方式不同 -->
interface 用 extends 继承（可多继承）
type 用交叉类型 & 合并
```ts
// interface 继承
interface Person {
  name: string
}
interface Employee extends Person {
  job: string
}

// type 交叉类型
type PersonType = { name: string }
type EmployeeType = PersonType & { job: string }

const e1: Employee = { name: 'Alice', job: 'Dev' }
const e2: EmployeeType = { name: 'Bob', job: 'QA' }

```

- 区别二：声明合并（只有 interface 有）
```ts
interface Animal {
  name: string
}
interface Animal {
  age: number
}
// 合并结果：{ name: string; age: number }
const dog: Animal = { name: '旺财', age: 3 }

// type 不能重复声明
type AnimalType = { name: string }
// ❌ 再声明会报错
// type AnimalType = { age: number }

```

4. 区别三：能否表示非对象类型
type 可以用来定义基础类型、联合类型、元组等
interface 只能描述对象结构（包括函数、类）
```ts
// type 可以这样
type ID = string | number   // 联合类型
type Point = [number, number] // 元组

// interface 不行 ❌
// interface ID = string | number  // 会报错

```

5. 区别四：函数类型写法差异
```
// interface 函数
interface AddFn {
  (a: number, b: number): number
}

// type 函数
type AddType = (a: number, b: number) => number

const add1: AddFn = (x, y) => x + y
const add2: AddType = (x, y) => x + y

```