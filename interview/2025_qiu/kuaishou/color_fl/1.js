function sortColors(nums) {
    let left = 0;
    let right = nums.length - 1;
    let i = 0;

    while (i <= right) {
        if (nums[i] === 0) {
            [nums[i], nums[left]] = [nums[left], nums[i]];
            left++;
            i++; // 安全，左边换来的只能是 0 或 1
        } else if (nums[i] === 1) {
            i++;
        } else if (nums[i] === 2) {
            [nums[i], nums[right]] = [nums[right], nums[i]];
            right--; // i 不++，需要重新检查换过来的数
        }
    }
}

// 测试
const nums1 = [2, 0, 2, 1, 1, 0];
sortColors(nums1);
console.log(nums1); // [0, 0, 1, 1, 2, 2]

const nums2 = [2, 0, 1];
sortColors(nums2);
console.log(nums2); // [0, 1, 2]