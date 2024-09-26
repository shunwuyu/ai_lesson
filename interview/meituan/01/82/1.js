function deleteDuplicates(head) {
    // 创建哨兵节点
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while (head && head.next) {
        // 当前节点与下一个节点值相同，说明有重复
        if (head.val === head.next.val) {
            // 跳过所有重复的节点
            while (head.next && head.val === head.next.val) {
                head = head.next;
            }
            // 跳过最后一个重复的节点
            prev.next = head.next;
        } else {
            // 没有重复，前驱节点向前移动
            prev = prev.next;
        }

        // 继续检查下一个节点
        head = head.next;
    }

    return dummy.next;
}