// [4, 2, 7, 1] → [4, 2] 和 [7, 1]
// [4, 2] → [4] 和 [2]
// [7, 1] → [7] 和 [1]
// 合并排序：
// [4] 和 [2] 合并为 [2, 4]
// [7] 和 [1] 合并为 [1, 7]
// 最终合并：
// [2, 4] 和 [1, 7] 合并为 [1, 2, 4, 7]
function mergeSort(arr) {
    // 递归终止条件：数组长度为1或0时，直接返回
    if (arr.length <= 1) return arr;
  
    // 找到中间位置，将数组分为左右两部分
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    // 递归排序左右两部分，并合并
    return merge(mergeSort(left), mergeSort(right));
  }
  
  // 合并两个有序数组
  function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
  
    // 比较左右数组的元素，依次放入结果数组
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
  
    // 合并剩余元素
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  
  // 示例
  const arr = [5, 2, 9, 1, 5, 6];
  console.log(mergeSort(arr)); // 输出: [1, 2, 5, 5, 6, 9]