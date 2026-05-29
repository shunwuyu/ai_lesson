function threeSum(nums) {
  nums.sort((a, b) => a - b); // 排序 sort 会改变原数组
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) { // 需要预留两个位置给 left 和 right
    // 跳过重复的起点
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        // 跳过重复的 left 和 right
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;

      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return res;
}
