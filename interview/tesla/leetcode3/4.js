/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function(nums) {
    let n = nums.length;
    if (n == 0) {
        return 0;
    }
    let dp = new Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        // 只需要关注比它小的元素
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                // nums[j]之后添加nums[i]来构造一个新的递增子序列，其长度为dp[j] + 1
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    console.log(dp, '//////');
    return dp[n-1]
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))