// Symbol.hasInstance 可自定义 instanceof 判断逻辑，
// 控制对象是否为某类实例。
class PrimitiveNumber {
    // 静态方法
    static [Symbol.hasInstance](x) {
        // 方法接收一个参数 x，返回 typeof x === 'number'
        return typeof x === 'number'
    }
}
// 按照正常的 JS 行为，111 instanceof PrimitiveNumber 
// 应该是 false，因为 111 不是 PrimitiveNumber 的实例。
// 但由于我们自定义了 Symbol.hasInstance，
// 所以会调用 PrimitiveNumber[Symbol.hasInstance](111)
console.log(111 instanceof PrimitiveNumber) // true
