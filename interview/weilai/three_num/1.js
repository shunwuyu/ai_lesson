function threeSum(nums) {
    nums.sort((a, b) => a - b);  // Step 1: Sort the array
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;  // Skip duplicate `nums[i]`

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // Skip duplicate `nums[left]` and `nums[right]`
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;  // Increase the sum by moving `left` rightwards
            } else {
                right--;  // Decrease the sum by moving `right` leftwards
            }
        }
    }

    return result;
}