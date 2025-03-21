const obj = {
    bigNumber: 9007199254740992, // 2^53
    biggerNumber: 9007199254740993 // 2^53 + 1，超出精确表示范围
  };
  
  const copy = JSON.parse(JSON.stringify(obj));
  console.log(obj.biggerNumber === copy.biggerNumber); // true，但实际上9007199254740993在JavaScript中无法精确表示
  console.log(obj.biggerNumber); // 9007199254740992，精度已丢失