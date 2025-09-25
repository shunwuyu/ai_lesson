// 经典示例
// 在 setTimeout、map、React 事件中用箭头函数可避免 .bind(this)。
const obj = {
  name: "Andrew",
  normalFn() { setTimeout(function(){ console.log(this.name) }, 0); },
  arrowFn()  { setTimeout(() => console.log(this.name), 0); }
};
obj.normalFn(); // undefined
obj.arrowFn();  // Andrew


