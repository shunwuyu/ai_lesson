function partition(nums, left, right) {
  // 以 nums[left] 为基准数
  let i = left, j = right;
  while (i < j) {
      while (i < j && nums[j] >= nums[left]) {
          j--; // 从右向左找首个小于基准数的元素
      }
      while (i < j && nums[i] <= nums[left]) {
          i++; // 从左向右找首个大于基准数的元素
      }
      // 元素交换
      [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // 将基准数交换至两子数组的分界线
  [nums[i], nums[left]] = [nums[left], nums[i]];
  return i; // 返回基准数的索引
}

function quickSort(nums, left, right) {
  // 子数组长度为 1 时终止递归
  if (left >= right) {
      return;
  }
  // 哨兵划分
  let pivot = partition(nums, left, right);
  // 递归左子数组、右子数组
  quickSort(nums, left, pivot - 1);
  quickSort(nums, pivot + 1, right);
}
const arr = [2, 4, 1, 0, 3, 5]
quickSort(arr, 0, arr.length - 1)
console.log(arr)