// 递归
function reverseString(str) {
  if (str === "") {
    return "";
  } else {
    // 递归情况：
    // 1. str.substr(1) 获取除第一个字符外的剩余字符串
    // 2. 对剩余字符串递归调用 reverseString 函数
    // 3. str.charAt(0) 获取字符串的第一个字符
    // 4. 将递归结果与第一个字符拼接起来
    return reverseString(str.substr(1)) + str.charAt(0);
  }
}

console.log(reverseString("hello")); // 输出: "olleh"