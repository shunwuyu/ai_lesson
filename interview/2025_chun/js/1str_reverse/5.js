function reverseString(str) {
  let reversed = '';
  for (const char of str) {
    // 在每次循环中，将当前字符 char 拼接到 reversed 字符串的前面。这样，随着循环的进行，
    // reversed 字符串会逐渐构建成输入字符串的反转形式。
    reversed = char + reversed;
  }
  return reversed;
}