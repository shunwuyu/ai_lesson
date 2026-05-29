
// 把数组通过一个栈来维护
// 当栈不为空的时候循环执行处理
// pop()将栈尾出栈
// 如果出栈的元素是数组,就将该元素解构后每一元素进行入栈操作
// 出栈的元素不是数组就push进返回值res
// 反转恢复原数组的顺序
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}
flatten(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
