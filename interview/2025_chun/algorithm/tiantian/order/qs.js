function quickSort(arr) {
    if (arr.length <= 1) return arr; // 基线条件
  
    const pivot = arr[0]; // 选择基准值
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    // 递归排序左右两边
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  
  // 示例
  const arr = [5, 2, 9, 1, 5, 6];
  console.log(quickSort(arr)); // 输出: [1, 2, 5, 5, 6, 9]