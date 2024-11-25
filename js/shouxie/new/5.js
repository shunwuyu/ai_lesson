function logArgs() {
  // 类数组
  console.log(Object.prototype.toString.call(arguments))
  console.log(arguments.length);
  // is not a function
  arguments.forEach(element => {
    console.log(element);
  });
  const argsArray = Array.from(arguments);
  console.log(argsArray);
}

logArgs(1, 2, 3); // 输出: [1, 2, 3]

