[source](https://juejin.cn/post/7311194549355085861)

- 不含有重复字符的「最长子串」的长度    

    abcabcbb   abc   3
    bbbbb      b     1
    pwwkew     wke   3 
    ""         0 

    - 滑动窗口 

    滑动窗口算法是一种使用双指针技术解决序列问题的方法，通过维护一个窗口，在遍历过程中调整窗口大小或位置，寻找满足特定条件的子序列。

    - hashTable 的作用是？
        - 存储字符及其索引   
        哈希表（map）用来存储每个字符及其在滑动窗口内的最新索引位置，键是字符，值是字符的索引。
        - 检测重复字符
            当遍历字符串时，可以通过查询哈希表迅速得知当前字符是否在滑动窗口内已经出现过，以及其最后一次出现的位置。
        - 更新滑动窗口
            若当前字符已存在于哈希表中并且其索引值大于等于滑动窗口的左边界，表明出现了重复字符，此时可立即更新滑动窗口的左边界（start）为重复字符的下一个位置。
        - 辅助计算子串长度
            通过不断更新哈希表并适时调整滑动窗口的左右边界，可以高效地计算出当前无重复字符子串的长度，并与之前的最长子串长度做比较，找到最长的那个。

    - 时间复杂度：虽然有两层循环，但每个字符在哈希表中最多只会被插入和删除一次，复杂度为 O(n）
    - 空间复杂度：使用了哈希表进行字符记录，复杂度为 O(n)

## 滑动窗口的最大值 


- 约束范围可以用双指针  扮猪吃老虎
- 双端对队解法
优化的目标   O(kn) -> O(n)

- 单调栈
    https://www.bilibili.com/video/BV1XS4y1p7qj/?spm_id_from=333.337.search-card.all.click

核心的思路是维护一个有效的递减队列   

https://juejin.cn/book/6844733800300150797/section/6844733800358871054