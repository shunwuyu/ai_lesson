# 字符串常用方法

- 拼接
    + 
    concat 
- 长度 length
    const str = "Hello, World!";
console.log(str.length); // 输出: 13
    包装类
- 字符串查找
    indexOf
    lastIndexOf
    es6 includes
- 字符串替换
    replace
    可以结合正则和回调函数 ，实现动态替换，灵活处理复杂字符串转换。
- 字符串分割
    split 
- 字符串修剪
    .trim()
- 字符串大小写转换
    toUpperCase
    toLowerCase

- 字符串重复
    repeat
- 字符串模板与多行字符串
    表达html 

- 字符串
    substr() 方法用于从字符串中提取指定位置开始的子字符串，直到指定的长度
    slice(start, end) 

    slice() 接受起始和结束索引，支持负索引；而 substr() 接受起始索引和长度。slice() 提取指定范围的子字符串，substr() 提取从起始位置开始的指定长度的子字符串。

    一个是范围， 一个是长度
- 返回指定位置字符的 。
    chatAt返回指定位置的字符  
    chatCodeAt返回指定位置字符的 Unicode 编码。
- endsWith startsWith
