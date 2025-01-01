Array.prototype.map2 = function(callback, thisArg) {
  if (this == null) {
      throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function')
  }

  // 数组实际上是一种特殊的对象，通过 Object(this) 可以将其转换为一个普通对象，以便后续操作
  // this可能会指向全局对象（在非严格模式下）或者undefined（在严格模式下），这取决于函数是如何被调用的
  // Object(this)还可以防止在回调函数中意外修改原始数组。因为O是原始数组的一个副本，
  // 所以对O的任何操作都不会影响原始数组。这有助于保持函数的纯度，使得map2方法可以安全地用于不可变编程。
  const O = Object(this)
  // console.log(this.length, O.length, '/////')
  const len = O.length 
  let k = 0, res = []
  while (k < len) {
      if (k in O) {
          res[k] = callback.call(thisArg, O[k], k, O);
      }
      k++;
  }
   return res
}

const arr = [1, 2, 3, 4, 5]
const res = arr.map2((item, index, arr) => {
  return item * 2
})