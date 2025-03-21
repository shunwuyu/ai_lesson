# 快排

## 核心思想
- 分治
- 选择一个基准元素（pivot）
- 将小于基准的元素放左边，大于基准的放右边
- 递归对左右两部分进行相同操作

## 代码实现
/**
 * 快速排序算法的实现
 * @param {number[]} arr - 需要排序的数组
 * @returns {number[]} - 排序后的数组
 */
function quickSort(arr) {
  // 基本情况：如果数组长度小于等于1，直接返回
  if (arr.length <= 1) return arr;
  
  // 选择数组中间位置的元素作为基准值（pivot）
  const pivot = arr[Math.floor(arr.length / 2)];
  
  // 将小于基准值的元素筛选到左子数组
  const left = arr.filter(x => x < pivot);
  
  // 将大于基准值的元素筛选到右子数组
  const right = arr.filter(x => x > pivot);
  
  // 递归地对左右子数组进行快速排序，并与基准值组合
  // 最终返回排序后的完整数组
  return [...quickSort(left), pivot, ...quickSort(right)];
}

## 快排快的原因
    - On(logn)
    - 其他是O(n^2)


## 快排什么情况下性能不好

- 数据已经有序或接近有序时
    - 冒泡排序 对于接近有序的数据也表现不错
        - 因为它可以通过标记是否发生交换来提前终止排序
        - 如果一趟排序中没有发生交换，说明数组已经有序，可以直接结束
    - 插入排序 1.js
        牌
        对于接近有序的数据也表现不错
- 选择了最大或最小元素作为基准值时
- 数据量很小时（此时插入排序更高效）
