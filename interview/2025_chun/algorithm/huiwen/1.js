// 判断回文
// 双指针
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false; // 不相等则不是回文
        }
        left++;
        right--;
    }
    return true; // 全部字符相等则是回文
}