function combine(arr) {
    // 结果数组，用来保存所有可能的组合
    const result = [];

    // 递归函数
    function backtrack(index, path) {
        // 如果到达数组的末尾，将当前路径 path 加入结果数组
        if (index === arr.length) {
            result.push([...path]);
            return;
        }

        // 遍历当前行的所有元素
        for (let num of arr[index]) {
            // 将当前元素加入路径
            path.push(num);
            // 递归处理下一行
            backtrack(index + 1, path);
            // 回溯，移除最后一个元素，准备尝试下一个可能的组合
            path.pop();
        }
    }

    // 从第 0 行开始递归
    backtrack(0, []);
    return result;
}

// 示例数组
const arr = [
  [1, 2],
  [3, 4],
  [5, 6]
];

// 获取所有组合
const combinations = combine(arr);
console.log(combinations);
