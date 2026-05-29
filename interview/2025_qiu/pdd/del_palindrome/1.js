function validPalindrome(s) {
  const isPal = (str, i, j) => {
    while (i < j) {
      if (str[i] !== str[j]) return false;
      i++;
      j--;
    }
    return true;
  };

  let left = 0, right = s.length - 1;

  while (left < right) {
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      // 核心：跳过左边或右边任意一个字符继续检查
      return isPal(s, left + 1, right) || isPal(s, left, right - 1);
    }
  }
  return true;
}

// 测试
console.log(validPalindrome("abca")); // true  删除 b 或 c 都可以
console.log(validPalindrome("racecar")); // true  已是回文
console.log(validPalindrome("abc")); // false
