function flatten(arr) {
    while (arr.some(item=> Array.isArray(item))) {
      console.log(...arr)
      arr = [].concat(...arr)
      console.log(arr)
    }
    return arr
  }
  console.log(flatten(arr));
  