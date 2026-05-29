// var proxy = new Proxy({}, {
//   get: function(obj, prop) {
//       console.log('设置 get 操作')
//       return obj[prop];
//   },
//   set: function(obj, prop, value) {
//       console.log('设置 set 操作')
//       obj[prop] = value;
//   },
//   has (target, key) {
//     if (key[0] === '_') {
//       return false;
//     }
//     return key in target;
//   }
// });

// proxy.time = 35; // 设置 set 操作

// console.log(proxy.time); // 设置 get 操作 // 35


// var target = { _prop: 'foo', prop: 'foo' };
// var proxy2 = new Proxy(target, {
//   // 拦截 propKey in proxy 的操作
//   has (target, key) {
//     if (key[0] === '_') {
//       return false;
//     }
//     return key in target;
//   },
//   // apply 方法拦截函数的调用
//   apply: function () {
//     return 'I am the proxy';
//   }
// });
// console.log('_prop' in proxy2); // false

// var target = function () { return 'I am the target'; };
// var handler = {
//   apply: function () {
//     return 'I am the proxy';
//   }
// };

// var p = new Proxy(target, handler);

// console.log(p());
// "I am the proxy"

// ownKeys 对象自身属性的读取操作

let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"