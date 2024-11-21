Object(123)             // 等价于 new Number(123)
Object(123n)            // 等价于 new BigInt(123n)
Object("str")           // 等价于 new String("str")
console.log(Object(true))            // 等价于 new Boolean(true)
console.log(Object(Symbol("sym")))
console.log(Object(null)) // 不可以
console.log(Object(undefined)) // 不可以