const obj = { name: 'Andrew' };

const arrow = () => console.log(this.name);
const normal = function() { console.log(this.name); };

arrow.call(obj);   // undefined（this继承定义时的外层，如全局或模块）
normal.call(obj);  // Andrew（this被call成功修改）
