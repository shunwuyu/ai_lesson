const arr = [1, [2, [3, [4, 5]]], 6]

 function flatten(params) {
   return params.flat(Infinity)
 }
 console.log(flatten(arr));
 