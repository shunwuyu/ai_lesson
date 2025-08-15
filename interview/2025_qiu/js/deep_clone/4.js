const target = { a: 1 };
const source = {
  b: {
    name: "小明",
    hobbies: ["篮球", "音乐"]
  }
};

Object.assign(target, source);

// 现在修改 target.b 的内容
target.b.name = "小红";
target.b.hobbies.push("画画");

console.log(source.b.name);     // 小红 ❌ 原对象也被改了！
console.log(source.b.hobbies);  // ["篮球", "音乐", "画画"] ❌ 也被改了！