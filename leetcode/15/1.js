var threeSum = function(nums, target) {
    nums.sort((a, b) => a - b); // 首先对数组进行排序

    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复元素，避免重复计算

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++; // 跳过重复元素
                while (left < right && nums[right] === nums[right - 1]) right--; // 跳过重复元素
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
};
