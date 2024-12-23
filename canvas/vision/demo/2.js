function foo() {
  console.log(this.a);
}

var a = 2;

var obj = {
  a: 3,
  foo: foo
};

foo(); // 调用全局函数foo
obj.foo(); // 调用obj对象的foo方法