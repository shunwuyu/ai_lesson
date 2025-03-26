// 要让对象能够被数组解构，需要实现 Symbol.iterator 接口
const obj = {
    a: 1,
    b: 2,
    // 添加 Symbol.iterator 方法使对象可迭代
    [Symbol.iterator]() {
        // 获取对象的所有值
        const values = Object.values(this);
        let index = 0;
        // 返回迭代器对象
        return {
            next() {
                if (index < values.length) {
                    return {
                        value: values[index++],
                        done: false
                    };
                }
                return { done: true };
            }
        };
    }
};

// 现在可以对该对象进行数组解构
var [a, b] = obj;
console.log(a); // 1
console.log(b); // 2
