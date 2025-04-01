/**
 * 三数之和
 * @param {number[]} nums - 输入数组
 * @returns {number[][]} - 所有和为零的三元组
 */
function threeSum(nums) {
    const result = [];
    // 从小到大进行排序。
    // 如果 a - b 的结果为负数，表示 a 应该排在 b 前面（即 a 小于 b）。
    // 如果结果为正数，表示 b 应该排在 a 前面（即 b 小于 a）。
    // a-b>0
    nums.sort((a, b) => a - b); // 先对数组进行排序

    for (let i = 0; i < nums.length - 2; i++) {
        // 跳过重复的元素
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1; // 左指针
        let right = nums.length - 1; // 右指针

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]; // 计算三数之和

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]); // 找到三元组
                // 跳过重复的元素
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++; // 和小于0，左指针右移
            } else {
                right--; // 和大于0，右指针左移
            }
        }
    }

    return result; // 返回结果
}

// 使用示例
const nums = [-1, 0, 1, 2, -1, -4];
const triplets = threeSum(nums);
console.log(triplets); // 输出: [[-1, -1, 2], [-1, 0, 1]]