function twoSum(nums, target) {
    const map = new Map(); // 创建哈希表

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]; // 计算补数

        // 检查补数是否在哈希表中
        if (map.has(complement)) {
            return [map.get(complement), i]; // 返回补数的索引和当前索引
        }

        // 将当前数及其索引存入哈希表
        map.set(nums[i], i);
    }

    throw new Error("No two sum solution"); // 如果没有找到，抛出错误
}