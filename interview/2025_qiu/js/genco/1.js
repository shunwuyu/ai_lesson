// 定义一个 Generator 函数
// function*：定义一个生成器函数。
// yield：暂停执行，返回值。
// .next()：恢复执行，返回 { value: ..., done: false/true }。
// 可以无限生成值，适合实现迭代器、状态机、异步流程控制等。
// 你可以把它理解为：能“暂停”和“恢复”的函数。
function* idGenerator() {
    let id = 1;
    while (id < 4) {
      yield id++; // 每次调用 next() 返回当前 id，并暂停
    }
  }
  
  // 使用生成器
  const gen = idGenerator();
  
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // 3
  console.log(gen.next().value, gen.next()); // 4