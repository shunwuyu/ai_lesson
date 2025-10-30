// JS 在执行前会“提升”函数声明，但不会提升函数表达式。
sayHi(); // ✅ 可执行
function sayHi() {
  console.log('Hi!');
}

sayBye(); // ❌ 报错
const sayBye = function() {
  console.log('Bye!');
};
