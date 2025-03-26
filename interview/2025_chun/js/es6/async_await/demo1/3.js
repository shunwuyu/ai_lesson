// 手写实现 async/await
// 接收一个生成器函数作为参数，返回一个新的函数
function asyncToGenerator(generatorFunc) {
    // 返回一个新函数，这个函数执行后返回一个Promise
    return function() {
        // 生成器函数执行后返回一个迭代器对象
        const gen = generatorFunc.apply(this, arguments);
        
        // 返回一个Promise，用于处理异步流程
        return new Promise((resolve, reject) => {
            // step函数用于执行生成器的下一步
            // key: 'next' 或 'throw'
            // arg: 传给生成器的值
            function step(key, arg) {
                let generatorResult;
                try {
                    // 执行生成器的下一步
                    generatorResult = gen[key](arg);
                } catch (error) {
                    // 出错时reject
                    return reject(error);
                }
                
                // 解构出值和是否完成的标志
                const { value, done } = generatorResult;
                
                if (done) {
                    // 如果迭代完成，则resolve最终值
                    return resolve(value);
                } else {
                    // 否则，将yield的值包装成Promise，继续执行下一步
                    return Promise.resolve(value).then(
                        // 成功则继续执行下一步
                        val => step('next', val),
                        // 失败则抛出错误
                        err => step('throw', err)
                    );
                }
            }
            
            // 开始执行第一步
            step('next');
        });
    }
}

// 测试代码
function* testGenerator() {
    // yield后面跟Promise，返回Promise resolve的值
    const result1 = yield Promise.resolve('Hello');
    console.log(result1); // 输出: Hello
    const result2 = yield Promise.resolve('World');
    console.log(result2); // 输出: World
    return 'Done'; // 返回最终结果
}

// 将生成器函数转换为async函数
const asyncFunc = asyncToGenerator(testGenerator);
// 执行并打印最终结果
asyncFunc().then(finalResult => {
    console.log('Final result:', finalResult); // 输出: Final result: Done
});
