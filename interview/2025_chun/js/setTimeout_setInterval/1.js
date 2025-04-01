/**
 * 模拟 setInterval 的功能
 * @param {function} callback - 要执行的回调函数
 * @param {number} interval - 执行间隔（毫秒）
 * @returns {number} - 返回的定时器ID，用于清除定时器
 */
function mySetInterval(callback, interval) {
    // 定义一个变量来存储定时器ID
    let timerId;

    // 定义一个内部函数，用于执行回调并设置下一个定时器
    function execute() {
        // 执行回调函数
        callback();
        // 设置下一个定时器
        timerId = setTimeout(execute, interval);
    }

    // 启动第一次执行
    timerId = setTimeout(execute, interval);

    // 返回定时器ID，以便后续可以清除
    return timerId;
}

/**
 * 清除模拟的 setInterval
 * @param {number} timerId - 定时器ID
 */
function myClearInterval(timerId) {
    clearTimeout(timerId);
}

// 使用示例
const intervalId = mySetInterval(() => {
    console.log('Hello, World!');
}, 1000); // 每1000毫秒（1秒）打印一次

// 停止定时器的示例（例如在5秒后停止）
setTimeout(() => {
    myClearInterval(intervalId);
    console.log('Interval cleared!');
}, 5000); // 5秒后清除定时器

