const obj = {
    regularNum: 42,
    notANumber: NaN,
    positiveInfinity: Infinity,
    negativeInfinity: -Infinity
  };
  
  const copy = JSON.parse(JSON.stringify(obj));
  console.log(copy);
  // 输出: { regularNum: 42, notANumber: null, positiveInfinity: null, negativeInfinity: null }