请你实现一个通用的 polling 函数，用于轮询接口请求。

polling(fn, condition, interval, maxRetry)

fn：一个返回 Promise 的异步请求函数

condition(result)：一个函数，用于判断是否满足终止轮询的条件

interval：每次请求之间的间隔时间（毫秒）

maxRetry：最大重试次数


轮询逻辑：

立即执行一次 fn()

如果返回结果满足 condition(result)，则立即停止并返回该结果

否则在 interval 毫秒后再次调用

若达到最大重试次数仍未满足条件，则返回失败（reject）


要求代码可读性良好，结构清晰

