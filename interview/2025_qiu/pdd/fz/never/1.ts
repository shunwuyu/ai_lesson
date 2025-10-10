// TypeScript 的类型推断机制是指编译器根据变量、函数或表达式的初始值或上下文自动推导出类型，无需显式声明。
// 放上去， 类型推导 number
function sum(a: number, b: number) {
  return a + b
}


type SumReturn = ReturnType<typeof sum>

function fetchData<T>(data: T) {
  return { data, timestamp: Date.now() }
}

type Result = ReturnType<typeof fetchData<string>>