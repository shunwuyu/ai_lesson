// reverse 是 JavaScript 数组对象的一个方法，它会反转数组中元素的顺序
function reverseString(str) {
  if (typeof str !== 'string') {
    return '输入必须是字符串';
  }
  return str.split('').reverse().join('');
}

console.log(reverseString("hello"));