let arr = [2021, 1, 1]
let date2 = new (Function.prototype.bind.apply(
  Date, 
  [null].concat(arr)
))
console.log(date2) 