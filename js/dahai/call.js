Function.prototype.myCall = function (context) {
  // 如果 context 是 null 或 undefined，则默认指向全局对象（浏览器中是 window）
  if (context === null || context === undefined) {
    context = window;
  }

  // 将 this 转换为对象类型（因为 call 只能被函数调用）
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.myCall called on non-function');
  }

  // 生成一个唯一的属性名，避免覆盖目标对象原有属性
  const fnKey = Symbol('fn');

  // 把当前函数赋值给 context 的一个临时属性
  context[fnKey] = this;

  // 获取传入的参数（除去第一个 context 参数）
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  // 使用展开语法调用函数 
  // 函数作为对象的属性时，this 指向该对象
  const result = context[fnKey](...args);

  // 删除临时添加的属性
  delete context[fnKey];

  // 返回执行结果
  return result;
};

function greet(greeting, punctuation) {
  return greeting + ', ' + this.name + punctuation;
}

const person = { name: 'Alice' };

console.log(greet.myCall(person, 'Hello', '!')); 
