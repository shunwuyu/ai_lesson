// 思路：先整体翻转，再分别翻转前k个和后面的元素
function rotate(nums, k) {
    k = k % nums.length; // 处理 k 大于数组长度的情况
    
    // 1. 整体翻转
    reverse(nums, 0, nums.length - 1);
    // 2. 翻转前k个
    reverse(nums, 0, k - 1);
    // 3. 翻转后面的
    reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}