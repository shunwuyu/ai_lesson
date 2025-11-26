// https://leetcode.com/problems/valid-parentheses/
// 用一个 map 来维护左括号和右括号的对应关系
// 该算法使用栈来验证括号字符串的有效性：遍历字符串时，
// 遇到左括号（'(', '[', '{'）就将其对应的右括号压入栈；
// 遇到右括号时，检查栈是否为空或栈顶元素是否与当前右括号匹配。
// 若不匹配或栈空，则字符串无效；遍历结束后，若栈为空，说明所有括号正确闭合，字符串有效。
const leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}"
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
  // 结合题意，空字符串无条件判断为 true
  if (!s) {
    return true;
  }
  // 初始化 stack 数组
  const stack = [];
  // 缓存字符串长度
  const len = s.length;
  // 遍历字符串
  for (let i = 0; i < len; i++) {
    // 缓存单个字符
    const ch = s[i];
    // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
    if (ch === "(" || ch === "{" || ch === "[") stack.push(leftToRight[ch]);
    // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
    else {
      // 若栈为空，或栈顶的左括号没有和当前字符匹配上，那么判为无效
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // 若所有的括号都能配对成功，那么最后栈应该是空的
  return !stack.length;
};


