/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // 维持一个递增的tails 数组
    const tails = []; // tails[i] 表示长度为 i+1 的递增子序列的最小末尾元素

    for (const x of nums) {
        // 二分查找：找到第一个 >= x 的位置（左边界）
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < x) {
                // mid 位置的值太小，x 应该在右边
                left = mid + 1;
            } else {
                // mid 位置可能合适，但继续找更左的位置
                right = mid;
            }
        }
        // 循环结束，left 就是第一个 >= x 的位置
        // 此时 left 是 x 应插入的位置
        if (left === tails.length) {
            // x 比所有末尾都大，可以延长子序列，新建一“堆”
            tails.push(x);
        } else {
          // left < tails.length
            // x 可以替换掉当前堆的末尾，使该长度的子序列结尾更小，利于后续扩展
            tails[left] = x;
        }
    }

    return tails.length; // 数组长度即为最长递增子序列的长度
};