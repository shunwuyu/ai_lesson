1. 为什么要考察算法？为何要学习算法？
  - 算法考察的是面试者的思维能力和解决问题的能力，而非单纯的代码能力。
  - 通过算法题目可以判断面试者是否具备将现实问题抽象成计算机可以理解的模型的能力，以及解决问题的思路是否清晰。
  - 算法能力可以反映出面试者在工程实践中处理复杂问题的能力，例如分析程序的性能和优化程序的时间和空间复杂度。
  - 很多公司，特别是互联网公司，都会用到各种算法来提高效率，例如搜索、推荐、排序等。
  - 优秀的算法能力是成为一名优秀程序员的必要条件。

2. 要了解哪些算法？
   - 递归算法（程技巧）
   - 双指针、滑动窗口（程技巧）
   - 分治（二分）
   - 回溯
   - 贪心
   - 动态规划

3. 哪些数据结构
  - 数组
  - 字符串
  - 链表
  - 栈
  - 队列
  - 二叉树
  - 哈希表

4. 递归
  
  面试题:求x的n次方
  x自乘nn次的结果
  1.js


  - 有没有效率更高的算法呢?
    肘间复杂度为O(n) 

    如果此时没有思 路’建议不要说不知道。可以租面试宫探讨-下,询问:‘‘
    **可不可以给点提示**,,°面试宫提示说: ‘‘考 虑-下递归算法” °

  - 递归算法 2.js
  - 这段代码的时间复杂度是多少
    递归算法的时间杂度本质上要看递归的次数与每次递归中的操作次数的乘积
    每次递归n都做-次减1的操作,那么就是递归了′′次,时间复杂度是O(n),每次执行-个乘 法操作!而乘法操作的时间复杂度星-个常数项O(1)》所以这段代码的时间复杂度是O（nx1） = O(1)


  - 都是O（n）没有优化啊， 怎么办？3.js
    快速幂算法
    
