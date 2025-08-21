// 进阶解法（迭代 + dummy，工程化思维）

function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(-1);
    let cur = dummy;
  
    while (l1 && l2) {
      if (l1.val < l2.val) {
        cur.next = l1;
        l1 = l1.next;
      } else {
        cur.next = l2;
        l2 = l2.next;
      }
      cur = cur.next;
    }
    cur.next = l1 || l2; // 剩余部分直接接上
    return dummy.next;
  }

//   避免递归爆栈，更稳健。
// dummy 简化逻辑，不用特殊处理头节点