- 两（三）数之和
    - 算法设计与数据结构的基本理解，尤其是哈希表的应用及其在解决查找问题中的效率优势。
        空间换时间   O(n)
    ```
    function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        // 检查当前元素的补数是否已经存在于 map 中
        if (map.has(complement)) {
            return [map.get(complement), i]; // 返回补数的索引和当前元素的索引
        }

        // 如果补数不存在，则将当前元素和它的索引存入 map 中
        map.set(nums[i], i);
    }

    // 如果没有找到结果，返回一个空数组
    return [];
}

// 示例用法
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // 输出: [0, 1]
    ```
    - 暴力破解  三数  O(n^3)
        - O(n) 固定一个数
        - 做指针  nums[i+1], nums[n-1]
            sum = nums[i] + nums[left] + nums[right]
            如果 sum 为零，说明找到了一个满足条件的三元组，记录下来，并调整指针以避免重复解。
            如果 sum 小于零，说明需要更大的数来抵消负数，移动左指针 left 向右。
            如果 sum 大于零，说明需要更小的数来减少总和，移动右指针 right 向左。
        - 去重处理:
            - 在固定第一个数 nums[i] 时，若它与前一个数相同，跳过该次循环以避免重复解。
            - 在找到一个三元组后，也需要移动 left 和 right 指针跳过重复元素。

- 订阅发布者
- type 和 interface 区别
- 泛型
    - 泛型的概念
    泛型（Generics） 允许在编写代码时创建可重用的组件，使这些组件不仅能处理某一种类型的数据，而是能适用于多种类型的数据。
    核心思想是**"类型的参数化"** 即允许类型参数化地传递，使得代码更加灵活和通用，同时仍然保持类型安全。

    function identity<T>(arg: T): T {
        return arg;
    }
    T 是一个类型参数，传入函数的类型将由调用时的类型决定。比如调用 identity<string>("hello") 会返回一个字符串，而调用 identity<number>(123) 会返回一个数字。
    泛型不仅可以应用于函数，还可以应用于类、接口、以及其他复杂的数据结构。
- webpack  
    
