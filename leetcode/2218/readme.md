字节面试题
https://leetcode.cn/problems/maximum-value-of-k-coins-from-piles/description/
https://cloud.tencent.com/developer/article/2064879


- 最值问题
    - 动态规划
    - 贪心
    动态规划关注全局最优解，通过分治和记忆化搜索实现
    贪心算法则着眼于每一步的局部最优解，但不保证全局最优，适合那些局部最优能直接推广到全局最优的问题

- 母题是0-1背包
- 思维导图

- 转化为背包问题
    stack的前n个元素的和sum可以看成重量为n, 价值为sum的商品
    - 对每一个栈，有0到n种选择，一共piles.length个栈
    - 递推方程为f[j]=max(f[j],f[j-w]+v)
- 分组背包

- hooks 的好处是
    可复用性 通过自定义 hooks（如 useLocalStorage），你可以封装一些通用逻辑并将其作为一个独立模块，在多个组件中复用，提高了代码的组织性和可维护性。

    模块化  每个 hook 可以专注于解决一个特定问题，使得功能模块更清晰、单一职责原则更加明显

    UI组件