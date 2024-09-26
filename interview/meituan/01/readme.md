- https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/
    删除排序链表中的重复元素
    给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。


- 删除排序链表中的重复元素
    给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
    1. 创建哨兵节点dummy, next 指向头节点head, 应对头节点需要被删除
    2. 两个指针  prev   head 
        - 如果重复
        head 移动， 直至不同的节点
        prev.next -> 
        - 不重复 
            prev->head
    3. 跳过重复节点
    