// null 和 undefined 被忽略
const target = { a: 1 };

Object.assign(target, null);      // 没事发生
Object.assign(target, undefined); // 没事发生

console.log(target); // { a: 1 }

// 如果 null 或 undefined 是目标对象，就会报错！
Object.assign(undefined, { a: 1 }); // ❌ 报错！
Object.assign(null, { a: 1 });      // ❌ 报错！

// 没毛病，obj 没变，返回它自己。
const obj = { name: "张三" };
Object.assign(obj); // 返回 obj 本身