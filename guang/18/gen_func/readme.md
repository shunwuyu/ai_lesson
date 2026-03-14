# 生成器函数

- 普通函数：一调用就从头跑到尾，return 后就结束（比如 function sum() { return 1+2; }）

- 生成器函数：跑一半能暂停（用 yield），下次调用又能从暂停的地方继续跑

    async await 的前身

## 核心语法

- 函数定义：加 *（星号），比如 function* gen() {}
- 暂停标记：yield（产出），函数执行到 yield 就停，把后面的值 “吐出来”
- 调用方式：生成器函数调用后返回一个迭代器对象，用 .next() 触发执行

function* fruitGenerator() {
  console.log('开始生产水果');
  yield '苹果'; // 第一次next()，停在这，吐出苹果
  console.log('继续生产');
  yield '香蕉'; // 第二次next()，停在这，吐出香蕉
  console.log('生产结束');
  return '没有水果了'; // 第三次next()，执行完，返回最终值
}

// 调用生成器，得到迭代器（相当于拿到工厂的“取货机”）
const fruitMachine = fruitGenerator();

// 按需取货（每次next()才生产一个）
console.log('第一次取货：', fruitMachine.next()); 
// 输出：开始生产水果 → { value: '苹果', done: false }（done=false表示没做完）

console.log('第二次取货：', fruitMachine.next()); 
// 输出：继续生产 → { value: '香蕉', done: false }

console.log('第三次取货：', fruitMachine.next()); 
// 输出：生产结束 → { value: '没有水果了', done: true }（done=true表示做完了）

## 解读

- 生成器函数像一个 “自动售货机”，调用后只是 “开机”，不会直接出东西
- 每按一次 .next()（投币），才会执行到下一个 yield，吐出对应的东西
- done 是 “是否卖完” 的标记，value 是 “拿到的东西”