function my_instance_of(leftVaule, rightVaule) {
    // 只有对象（包括数组、函数等）才有原型链，原始类型和 null 直接返回 false。
    if(typeof leftVaule !== 'object' || leftVaule === null) return false;
    // 获取构造函数的原型对象。
    let rightProto = rightVaule.prototype,
    // 获取实例对象的原型。
        leftProto = leftVaule.__proto__;
    // 原型链查找
    while (true) {
        // 不断沿着 leftProto.__proto__ 向上查找：
        if (leftProto === null) {
            return false;
        }
        if (leftProto === rightProto) {
            return true;
        }
        leftProto = leftProto.__proto__
    }
}
