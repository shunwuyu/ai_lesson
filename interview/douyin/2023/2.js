function sum(initialValue = 0) {
    let sum = initialValue;
  
    function add(number) {
      sum += number;
      return add;
    }
  
    add.valueOf = function() {
      return sum;
    };
  
    return add;
  }
  
  const result = sum(1)(2)(3)(4); // 输出10
  console.log(+result); // 输出10