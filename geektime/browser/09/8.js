function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}

// 符合我们的编程习惯了：作用域块内声明的变量不影响块外面的变量。