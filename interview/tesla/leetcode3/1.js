function lengthOfLongestSubstring(s) {
    // 创建一个哈希表（JavaScript 对象），用于存储字符及其在滑动窗口内的最新索引位置
    var map = {};
  
    // 初始化滑动窗口的左边界（start）和最长子串长度（maxLen）
    var start = 0;
    var maxLen = 0;
  
    // 创建一个变量（end），用于遍历整个字符串
    for (var end = 0; end < s.length; end++) {
      // 获取当前遍历到的字符
      var currentChar = s.charAt(end);
  
      // 如果当前字符已经在哈希表中，并且其索引大于滑动窗口的左边界
      if (map[currentChar] !== undefined && map[currentChar] >= start) {
        // 更新滑动窗口的左边界为重复字符在滑动窗口内的下一个位置
        start = map[currentChar] + 1;
      }
  
      // 更新哈希表中当前字符的索引位置为 end
      map[currentChar] = end;
  
      // 计算当前滑动窗口内的子串长度，并更新最长子串长度
      maxLen = Math.max(maxLen, end - start + 1);
    }
  
    // 返回最长无重复字符子串的长度
    return maxLen;
  }

  console.log(lengthOfLongestSubstring('abcabcbb'))