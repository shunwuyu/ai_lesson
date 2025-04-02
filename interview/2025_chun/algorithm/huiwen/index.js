/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    // 如果字符串长度小于2，直接返回原字符串
    if (s.length < 2) return s;
    
    let start = 0;  // 最长回文子串的起始位置
    let maxLength = 1;  // 最长回文子串的长度
    
    // 从中心向两边扩展的辅助函数
    function expandAroundCenter(left, right) {
        // 当左右指针在有效范围内且字符相等时，继续扩展
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            // 如果找到更长的回文串，更新起始位置和长度
            if (right - left + 1 > maxLength) {
                start = left;
                maxLength = right - left + 1;
            }
            left--;
            right++;
        }
    }
    
    // 遍历每个字符，以其为中心扩展
    for (let i = 0; i < s.length; i++) {
        // 处理奇数长度的回文串，如 "aba"
        expandAroundCenter(i, i);
        // 处理偶数长度的回文串，如 "abba"
        expandAroundCenter(i, i + 1);
    }
    
    // 返回最长回文子串
    return s.substring(start, start + maxLength);
}

// 测试用例
console.log(longestPalindrome("babad")); // 输出: "bab" 或 "aba"
console.log(longestPalindrome("cbbd")); // 输出: "bb"
console.log(longestPalindrome("a")); // 输出: "a" 