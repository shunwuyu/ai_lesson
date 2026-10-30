function maxSum(nums, k) {
    let max = -Infinity;
    let sum = 0;
    // 先算第一个窗口的和
    for (let i = 0; i < k; i++) {
        sum += nums[i];
    }
    max = sum;
    // 窗口开始滑动
    for (let i = k; i < nums.length; i++) {
        // 减去滑出去的左边元素，加上新进来的右边元素
        sum = sum - nums[i - k] + nums[i];
        max = Math.max(max, sum);
    }
    return max;
}

console.log(maxSum([2, 1, 5, 1, 3, 2], 3)); // 9
