let a: number = 1
let b: string = 'hello'
let c: boolean = true
let d: null = null
let e: undefined = undefined

let arr1: number[] = [1, 2, 3]
let arr2: Array<string> = ['a', 'b']
let user: [number, string] = [1, 'Tom']

enum Status {
  Pending, // 是数据枚举成员 0
  Success,// 是数据枚举成员 1
  Fail // 是数据枚举成员 2
}

let s: Status = Status.Success

let aa: any = 1 // 任意类型 可以赋值任意类型的值 逍遥丸
aa = 'b'
let bb: unknown = 1  // 未知类型 
bb = 'b'; // 可以赋值任意类型的值
// unknown 可以接收任意值，但使用前必须类型检查；直接调用方法不安全，所以报错。
bb.hello(); // 报错 未知类型 不能调用 hello 方法

let user2: { name: string; age: number } = {
  name: 'Tom',
  age: 18,
  // town:'ddd'
}

interface User {
  name: string
  age: number
  readonly id: number
  hobby?: string
}
const u: User = {
  id: 1,
  name: 'Tom',
  age: 18
}
u.id = 2 //
// u.age = 'dd'

type ID = string | number

type User = {
  name: string
  age: number
}