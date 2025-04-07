const arr2 = [1, [2, 3,4,5,6]]
let result = [];
for (let i = 0; i < arr2.length; i++) {
  
  result = result.concat((arr2[i]));

}

console.log(result);


