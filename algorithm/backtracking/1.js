// 存储每个数字对应的字母
// 我们通过 letterMap[digit] 可以直接访问到每个数字对应的字母。
// 但前两个索引（letterMap[0] 和 letterMap[1]）为空，因为按键 0 和 1 没有字母对应。
// 数字 2 对应字母 "abc"
// 数字 3 对应字母 "def"
const letterMap = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
// 根据给定的数字字符串，返回所有可能的字母组合
function letterCombinations(digits) {
  const result = [];
  const path = [];

  if (digits.length === 0) {
    return result;
  }
  // 函数调用 backtracking 函数进行回溯搜索。
  // index 表示当前正在处理的数字索引。
  function backtracking(index) {
    // 说明已经处理完所有数字，
    // 每次递归进入下一个数字，直到 index 达到 digits.length，此时 path 存储了一种完整的字母组合，将其加入到 result 中。
    if (index === digits.length) {
      // 将 path 数组中的字母组合成一个字符串，添加到 result 数组中，然后返回。
      result.push(path.join(""));
      return;
    }
    // 将当前数字转换为数字类型，并从 letterMap 中获取对应的字母字符串
    // '0' 在这段代码中的作用是作为一个基准值，用于将字符转换为数字
    const digit = digits[index] - '0';
    // 从 letterMap 中获取当前数字对应的字母字符串
    const letters = letterMap[digit];
    // 在每一层递归中，取当前数字的字母集合 letters，遍历这个字母集合，将每个字母加到当前路径 path 中。
    for (let i = 0; i < letters.length; i++) {
      // 这行代码将当前遍历到的字母 letters[i] 推入 path 数组中。path 数组用于存储当前正在构建的字母组合。
      path.push(letters[i]);
      // index 表示当前正在处理的数字在 digits 字符串中的位置。通过将 index 加 1，我们移动到下一个数字，并继续构建字母组合。
      backtracking(index + 1);
      // 这行代码在递归调用返回后执行，它将 path 数组中的最后一个元素弹出。这是回溯的一部分，当我们尝试了某个字母的所有可能组合后，需要回退到上一个状态，以便尝试其他字母。
      // 然后进行回溯，即从 path 中移除当前字母，尝试其他可能的字母。
      path.pop();
    }
  }

  backtracking(0);
  return result;
}

const digits = "234";
const combinations = letterCombinations(digits);
console.log(combinations);