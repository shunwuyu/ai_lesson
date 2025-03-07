/**
 * 根据指定类型过滤数组元素。
 * 
 * @param {Array} arr - 要过滤的数组。
 * @param {string} type - 想要保留的元素类型（如 'object', 'number', 'string' 等）。
 * @returns {Array} 返回一个包含指定类型的元素的新数组。
 */
function filterByType(arr, type) {
  // 使用 Array.prototype.filter 方法来筛选数组
  return arr.filter(item => {
      // 获取当前元素的类型
      const itemType = typeof item;

      // 支持 array 类型的判断
      if (type === 'array') {
        return Array.isArray(item);
      }


      // 对于对象类型需要特殊处理，因为 typeof null 也返回 'object'
      if (type === 'object') {
          // 检查是否为对象但不是null
          return item !== null && !Array.isArray(item) && itemType === type;
      }

      
      // 对于其他类型直接比较
      return itemType === type;
  });
}

// 示例使用
const mixedArray = [1, "hello", true, {}, [1, 2, 3], null, undefined, function() {}];
console.log(filterByType(mixedArray, 'object')); // 输出: [{}]