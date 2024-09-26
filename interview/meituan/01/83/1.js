function deleteDuplicates(head) {
    let current = head;

    while (current && current.next) {
        // 如果当前节点的值与下一个节点的值相同
        if (current.val === current.next.val) {
            // 跳过下一个节点
            current.next = current.next.next;
        } else {
            // 否则，移动到下一个节点
            current = current.next;
        }
    }

    return head;
}