https://juejin.cn/post/7010928535053271077?searchId=20241118113943BE85C04A923A083F2F0E

- 获取字符串

  charAt 与 [5]的区别
  字符串的类数组特性
  str[index] 将字符串视为字符数组访问，越界返回 undefined，而 charAt(index) 通过方法调用安全地返回指定索引的字符或空字符串，具有更好的兼容性。

- 拿到unicode 有什么用
   验证字符类型

  ```
  function isDigit(char) {
    const code = char.charCodeAt(0);
    return code >= 48 && code <= 57; // ASCII codes for '0' to '9'
}

console.log(isDigit('5')); // true
console.log(isDigit('a')); // false
  ```

## 检索字符串是否包含特定序列
  - 前两个方法得到的指定元素的索引值，并且只会返回第一次匹配到的值的位置
    indexOf
    lastIndexOf 
  indexOf()是正序查找，lastIndexOf()是逆序查找。

  - 后三个方法返回的是布尔值，表示是否匹配到指定的值
    includes 
    startsWith
    endsWith

## 拼接
  concat
  加操作符+，其更加简单

## 字符串分割成数组
  split
  string.split(separator,limit)

## 截取字符串
  slice 
  该方法返回的子串包括开始处的字符，但不包括结束处的字符。

