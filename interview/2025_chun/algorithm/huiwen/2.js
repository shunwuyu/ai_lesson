//  递归
function isPalindrome(s) {
    if (s.length <= 1) return true; // 基本情况：长度为0或1是回文

    if (s[0] !== s[s.length - 1]) {
        return false; // 不相等则不是回文
    }

    // 递归检查去掉首尾字符后的子串
    return isPalindrome(s.slice(1, s.length - 1));
}

