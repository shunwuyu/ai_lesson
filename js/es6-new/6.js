// 它比 concat() 更简洁

const arr = [1, 2, 3, 6, 5, 4]
// 使用扩展运算符 ...arr 将原数组 arr 的每个元素“展开”并插入到新数组中
let newArr = ['a', 'b', ...arr]
// 把整个 arr 再次拼接到 newArr 末尾
// 是的，concat() 不会修改原数组，它是一个纯函数（pure function），总是返回一个新数组，而原数组保持不变。
// newArr = newArr.concat(arr)
// push会
newArr.push(...arr)
console.log(newArr);

arr.sort((a, b) => {
  return b - a
})

console.log(arr);