const eachFlat = (arr = [], depth = 1) => {
    const result = []; // 缓存递归结果
    // 开始递归
    (function flat(arr, depth) {
      // forEach 会自动去除数组空位
      arr.forEach((item) => {
        // 控制递归深度
        if (Array.isArray(item) && depth > 0) {
          // 递归数组
          flat(item, depth - 1)
        } else {
          // 缓存元素
          result.push(item)
        }
      })
    })(arr, depth)
    // 返回递归结果
    return result;
  }
  