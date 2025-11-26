let myname = "极客时间";

function showName() {
  console.log(myname); // 应该输出 "极客时间"

  if (false) {
    let myname = "极客邦"; // 块级作用域变量，但此块永不执行
  }
}

showName();