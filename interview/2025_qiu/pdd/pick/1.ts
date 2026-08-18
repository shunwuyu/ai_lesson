interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// “Pick 就是从一个类型里挑你需要的字段，形成新的类型。”
// 只取 id 和 name
type UserPreview = Pick<User, 'id' | 'name'>;

const u: UserPreview = {
  id: 1,
  name: 'Alice',
  // age: 18, // ❌ 报错，age 不在 Pick 范围内
};


// Omit —— 去掉部分字段

// “Omit 正好和 Pick 相反，它把不需要的字段排除掉，剩下的组成新类型。”

type UserSafe = Omit<User, 'email'>;

const safeUser: UserSafe = {
  id: 2,
  name: 'Bob',
  age: 30,
  // email: 'bob@example.com' // ❌ 报错
};

/**
 * Partial：把原有类型的**所有字段全部变成可选**
 */
type PartialUser = Partial<User>;

// 不需要填全部属性，填一部分就可以
const patchUser: PartialUser = {
  name: "Charlie",
  age: 22
};

// 可以是空对象
const emptyObj: PartialUser = {};


// Record
// 构造一个对象类型：`Record<键类型,值类型>`
type Dict = Record<string, number>
const obj:Dict = {a:1, b:2}

// key:数字错误码，value:提示字符串
type ErrorMsgMap = Record<number, string>

const errorMessage: ErrorMsgMap = {
  400: "请求参数错误",
  401: "未登录，请重新登录",
  403: "权限不足，禁止访问",
  404: "资源找不到",
  500: "服务器内部异常"
}

// 使用
function getErrMsg(code: number) {
  return errorMessage[code] ?? "未知错误"
}

console.log(getErrMsg(401)) // 未登录，请重新登录

// ReturnType 获取函数**返回值的类型**
function fn(){ return {x:1,y:2} }
type FnReturn = ReturnType<typeof fn> 
// {x:number,y:number}

// Exclude<T, U>
// 从联合类型 T 中，删掉能赋值给 U 的类型，返回剩下的类型
//原始联合
type All = "id" | "name" | "age" | "email"
// 把 email 剔除掉
type AfterExclude = Exclude<All, "email"> 
// 结果："id" | "name" | "age"

// 高频面试题
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}
// Omit vs Exclude 核心区别 
// `Exclude` 处理联合类型；`Omit` 处理对象接口类型
// keyof User 得到所有key联合
type UserKeys = keyof User; // 'id'|'name'|'age'|'email'

// 剔除 email
type KeepKeys = Exclude<UserKeys, 'email'>; // 'id'|'name'|'age'

// 再Pick，就模拟Omit
type MyOmitUser = Pick<User, KeepKeys>


// ## 题目：`Omit<T, K>` 等价于 `Pick<T, Exclude<keyof T, K>>`，怎么理解？
// `keyof T` 拿到 T 所有键的联合类型。
// `Exclude`把要剔除的 K 键删掉，剩下需要保留的键。
// 再用`Pick`把剩下的键从类型 T 中挑选出来，就实现了 Omit 的效果。
// 这就是 TS 内部 Omit 的等价实现。
