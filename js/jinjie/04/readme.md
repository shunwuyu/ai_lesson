## 需求

1. 限制输入框中的内容长度
2. 拼接服务端数据为提示语
3. 在固定格式中提取信息（如身份证号中的生日）
4. 替换占位符

- 丛https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d9d7c8ad8b4404fae468edaac27c12e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp
    看到了什么？
    字符串可以定义为以“字符”为基本单位的有序序列。
    字符却并不是我们直觉意义上能看到的一个文字符号，比如英文字母“A”，或者汉字“中”，亦或是标点符号“·”，而是一个叫做“码元（Code Unit） ”的东西，占据 16bit，即 2byte 空间。

无论什么数据在计算机内容中都是二进制的数字表示的

一个码元就是一个 16 位无符号整数，最大为 0xFFFF
这个数字是需要映射到可见的、有意义的文字符号的，这个映射关系本来是由字符集 Unicode 来负责的，比如数字 65 映射为大写英文字母“A”，数字 0x4E2D 映射为汉字“中”，

一个字符的 Unicode 编码值不适合用来直接存储和传输，

纠错问题，即便错了一二进制位，就会变成另一个合法的字符；
前导问题，一个字符的编码值可能是另一个字符的前面一部分。

不好分割

Unicode 编码值会通过算法再次编码转换成另一个数字，来进行存储和传输。这个过程称为字符编码，我们常见的字符编码比如 GBK、GB2312、UTF-8 等等。

UTF-16
UTF-16 编码后只可能是 2byte 或 4byte 的。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ff6cca1ef064bc2815f43c4fa72b915~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

由于一个码元固定是 2byte 的，于是一个 Unicode 字符在 JavaScript 字符串中可能占据 1 个码元，也可能占据 2 个。

## 获取长度
length 的定义很清晰，就是码元的个数

## 截取片段
substring 和 slice 别混淆
它们的参数都是 [startIndex, endIndex)，半开区间

