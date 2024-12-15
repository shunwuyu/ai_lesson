var deepCopy = function(obj) {
  if (typeof obj !== 'object') return;
  // // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
  }
  return newObj;
}

const obj = {a:1, b:{c:2}, d:[1,[2,3]]}
const obj2 = deepCopy(obj)
// console.log(obj2)
obj2.d[1][0] = 100
console.log(obj2, obj);