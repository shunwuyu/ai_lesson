/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const n = nums.length;
    if (n === 0) return 0; // 空数组直接返回0

    // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
    // 初始每个元素自身构成长度为1的子序列
    const dp = new Array(n).fill(1);

    let maxLen = 1; // 记录全局最长递增子序列的长度

    // 从第二个元素开始遍历
    for (let i = 1; i < n; i++) {
        // 检查前面所有元素
        for (let j = 0; j < i; j++) {
            // 如果 nums[j] < nums[i]，说明 nums[i] 可以接在 nums[j] 后面
            // 更新 dp[i] 为更大的值
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        // 更新全局最大长度
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen; // 返回最长递增子序列的长度
};