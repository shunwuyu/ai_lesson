# Promise.all

## 有的人出生就在罗马

Promise.resolve()

const vipClient = Promise.resolve("Mercedes S-Class");



曾经有个程序员朋友跟我讲过一段刻骨铭心的往事, 他和一位女士一间钟情，不到一周就作出结婚决定。
他们两个相约在一个浪漫的日子， 去各自家里拿上户口本，去民政局登记。可那天他从早上8点等到了晚上8点，
那个女孩还是没有出现，他离开了那个城市。

- 参数必须是一个 数组
- 全部成功 → then
- 任意一个失败 → catch

## 语法意义
- 三个 Promise 并行执行
- Promise.all 会等待最慢的那个（这里约 1 秒）才返回结果。都成功才返回结果
- 结果数组 results 的顺序严格对应 [promise1, promise2, promise3] 的顺序，和谁先完成无关。
- 你把任意一个 reject 整个 Promise.all 会立即进入 .catch
Promise.all 的核心行为：全成功才成功，一失败就整体失败，结果按输入顺序排列。

Promise.all 之所以能并行，是因为 JS 只是充当了指挥官。它在极短的时间内将多个 I/O 任务委托给了浏览器的多线程模块（Web APIs

- https://github.com/shunwuyu/ai_lesson/blob/main/algorithm/hello-algo/stack/6.js
- 