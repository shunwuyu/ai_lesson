/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // i：nums1有效尾部，j：nums2尾部，k：nums1总尾部
    let i = m - 1, j = n - 1, k = m + n - 1;

    // 两个数组都没走完
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }

    // 如果nums2还有剩余元素，直接全部塞入前面
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
};

// 测试
let nums1 = [1,2,3,0,0,0];
merge(nums1, 3, [2,5,6], 3);
console.log(nums1); // [1,2,2,3,5,6]