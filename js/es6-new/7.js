const obj = {
  name: '康总',
  age: 18,
  // like: {
  //   n: '泡脚'
  // }
}

const key = 'sex'
// 使用变量作为属性名（动态设置属性）
// obj.sex = 'boy'
obj[key] = 'boy'

console.log(obj);

// 使用了 ES2020（ES11）新增的可选链操作符 ?.
// 如果直接写 obj.like.n，但 obj.like 是 undefined（如当前 like 被注释掉了），就会报错：
// 如果 obj.like 存在（不是 null 或 undefined），就继续读取 .n；否则，整个表达式返回 undefined，不报错。”
// console.log(obj.like?.n);