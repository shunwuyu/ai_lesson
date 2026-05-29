/**
 * 根据求值条件判断数组中最大的项
 * @param {Array} arr 数组
 * @param {String|Function} iteratee 返回一个求值表达式，可以根据对象属性的值求出最大项，比如item.age。也可以通过自定义函数返回求值表达式。
 */
function maxBy(arr, iteratee) {
  let values = [];
  if (typeof iteratee === 'string') {
      values = arr.map(item => item[iteratee]);
  } else if (typeof iteratee === 'function') {
      values = arr.map((item, index) => {
          return iteratee(item, index, arr);
      });
  }
  const maxOne = Math.max(...values);
  const maxIndex = values.findIndex(item => item === maxOne);
  return arr[maxIndex];
}

var list = [
  {name: '小明', age: 18},
  {name: '小红', age: 19},
  {name: '小李', age: 20}
]
// 根据age字段求出最大项，结果是小李。
var maxItem = maxBy(list, 'age');


const list = [
  {name: '小明', priority: 'middle'},
  {name: '小红', priority: 'low'},
  {name: '小李', priority: 'high'}
]
const maxItem = maxBy(list, function(item) {
  const { priority } = item
  const priorityValue = priority === 'low' ? 1 : priority === 'middle' ? 2 : priority === 'high' ? 3 : 0
  return priorityValue;
});

