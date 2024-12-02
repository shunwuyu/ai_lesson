function doSum() {
  let sum = 0
  for(let i = 0, l = arguments.length; i < l; i++){
      sum += arguments[i]
  }
  return sum
  
  // 或者
  // let args = [].slice.call(arguments) 
  // return args.reduce((acc, cur) => acc + cur)
}

console.log( doSum(1, 3) )        // 4
console.log( doSum(1, 3, 5) )     // 9
console.log( doSum(1, 3, 5, 7) ) 

function doSum(...arr) {
  return arr.reduce((acc, cur) => acc + cur)
}
console.log( doSum(1, 3) )        // 4
console.log( doSum(1, 3, 5) )     // 9
console.log( doSum(1, 3, 5, 7) )  // 16
