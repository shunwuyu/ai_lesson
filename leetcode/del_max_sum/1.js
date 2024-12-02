
function solution(n, k, nums) {
  let maxSum = -Infinity;
  // 遍历数组
  for (let i = 0; i < n; i++) {
      // 临时数组，删除当前元素
      let tempNums = nums.slice(0, i).concat(nums.slice(i + 1));
      // 滑动窗口计算子数组和
      let curSum = 0;
      for (let j = 0; j < k; j++) {
          curSum += tempNums[j];
      }
      // 初始化窗口起始位置
      let start = 0;
      for (let end = k; end < tempNums.length; end++) {
          curSum += tempNums[end] - tempNums[start];
          // 更新最大值
          maxSum = Math.max(maxSum, curSum);
          // 窗口起始位置后移
          start++;
      }
  }
  return maxSum;
}

function main() {
  // Add your test cases here
  console.log(solution(5, 3, [2, 1, 3, -1, 4]) === 8);
}

main();
