[source](https://leetcode.cn/problems/reverse-linked-list/)

- 先复述题目
    
    需要把单向链表反转

- 最常见的迭代解法 O(n) 时间，O(1) 空间，稳妥）

    - 面试官喜欢先看到“标准答案”。
    - 重点：你要讲清楚指针变化过程。
    反转过程中，curr 指针逐个遍历节点（O（n）），每到一个节点就将其 next 指针指向前一个节点 prev，然后 prev 和 curr 依次前移，实现链表方向的逐步翻转。
    双指针思想的体现。
    ```
    /**
 * 反转一个单向链表
 * @param {ListNode} head - 链表的头节点
 * @return {ListNode} - 反转后新链表的头节点
 */
function reverseList(head) {
    // prev 用于指向当前节点的前一个节点（反转后的下一个节点）
    // 初始为 null，因为反转后原头节点的 next 应该指向 null
    let prev = null;

    // curr 指向当前正在处理的节点
    // 从头节点开始遍历
    let curr = head;

    // 当 curr 不为 null 时，说明还有节点需要处理
    while (curr) {
        // 重要：先保存当前节点的下一个节点
        // 因为马上要修改 curr.next，否则会丢失后续链表的引用
        const next = curr.next;

        // 核心操作：将当前节点的指针反转，指向前一个节点
        // 这一步实现了链表方向的逆转
        curr.next = prev;

        // 将 prev 向前移动一步，指向当前节点
        // 为下一次循环做准备，此时 prev 指向已反转部分的“新头”
        prev = curr;

        // 将 curr 向后移动一步，指向之前保存的下一个节点
        // 继续处理链表的剩余部分
        curr = next;
    }

    // 循环结束后：
    // curr 为 null（已遍历完原链表）
    // prev 指向原链表的最后一个节点，也就是反转后的新头节点
    return prev;
}

    ```

- 递归解法

    先递归到链表末尾，然后在回溯过程中逐步反转指针。
    ```
    function reverseListRecursive(head) {
        <!-- 递归终止条件：如果当前节点为空（null）或只有一个节点（head.next 为 null），说明已经到达链表末尾或链表为空。
        此时这个节点就是反转后的新头节点，直接返回它。
         -->
        if (!head || !head.next) return head; // 基础情况：空链表 / 单节点
        <!-- 这一步会一直深入到链表最后一个节点，并将其作为 newHead 返回（在整个递归过程中，newHead 始终指向原链表的最后一个节点，也就是反转后的头节点）。 
        向尾部递进
        -->
        const newHead = reverseListRecursive(head.next); // 反转子链表
       <!-- 让 head 的下一个节点的 next 指针指回 head，实现指针反转。 -->
       <!-- 原链表 A -> B，执行后变成 A <-> B（暂时形成环）。 -->
       head.next.next = head; // 把子链表的尾巴指回当前节点
        head.next = null;      // 当前节点断开旧的 next

        return newHead; // 返回整个反转后的头节点
    }

    ```

    以链表 1 → 2 → 3 → null 为例：
    第 1 步（最底层递归返回）
    输入 head = 3 → null

    因为 head.next = null，直接返回 3。
    👉 此时返回的 newHead = 3。
    
    第 2 步（上一层 head = 2）
    我假设 reverseListRecursive(3) 已经返回了反转好的 3（其实就是 3 → null）。
    那么我需要把 2 接到 3 的后面：

    head.next.next = head; // 3.next = 2
    head.next = null;      // 2.next = null

    第 3 步（最外层 head = 1）
    我假设 reverseListRecursive(2) 已经返回了反转好的 3 → 2 → null。
    再把 1 接到后面：
    head.next.next = head; // 2.next = 1
    head.next = null;      // 1.next = null

递归最核心的套路是两句话：

假设子问题已经解决。

用子问题的结果来解决当前问题。

对于链表反转，问题是：

把整个链表 1 → 2 → 3 → null 反转。

我们可以递归地把它拆小：

假设我能反转 head.next 后面的链表。

那我只要再把 head 接到尾巴，就搞定了。


- 复杂度对比：迭代 O(1) 空间更优，递归更优雅但空间消耗大。
- 工程场景：如果链表长度很大（比如百万级），递归可能爆栈，这时迭代解法更可靠。