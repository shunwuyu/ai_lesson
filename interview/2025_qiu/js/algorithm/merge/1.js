function mergeTwoLists(l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
    } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
    }
  }
//   谁小取谁，递归下去。
// 时间复杂度：O(m+n)
// 空间复杂度：O(m+n)（递归栈）  
// 递归写法短小精悍，面试时先写这个，说明你思路清晰。