function outer() {
  let count = 0;

  return function inner() {
    count++;
    setTimeout(() => {
      console.log(count);
    }, 1000);
    return function nested() {
      count++;
      console.log(count);
    };
  };
}

const fn1 = outer();
const fn2 = fn1(); // 调用 inner
fn2();             // 调用 nested
const fn3 = fn1(); // 再次调用 inner
