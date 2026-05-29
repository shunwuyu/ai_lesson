## 队列(Queue)
只用 push 和 shift 完成增删的“数组”
队列是一种先进先出（FIFO，First In First Out）的数据结构。
排队 点餐、取餐

```
const queue = []  
queue.push('小册一姐')
queue.push('小册二姐')
queue.push('小册三姐')  
  
while(queue.length) {
    // 单纯访问队头元素（不出队）
    const top = queue[0]
    console.log(top,'取餐')
    // 将队头元素出队
    queue.shift()
}

// 队空
queue // []

```

## 链表

链表和数组相似？
它们都是**有序**的列表、都是线性结构（有且仅有一个前驱、有且仅有一个后继）
不同点？
链表中，数据单位的名称叫做“结点”，而结点和结点的分布，在内存中可以是离散的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36ee8a2b5e554d1e99125a3ace41f65a~tplv-k3u1fbpfcp-jj-mark:2722:0:0:0:q75.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87081b9e7fea480bb20225830f141e9b~tplv-k3u1fbpfcp-jj-mark:2722:0:0:0:q75.awebp)

- 怎么表示链表？
```
{
    // 数据域
    val: 1,
    // 指针域，指向下一个结点
    next: {
        val:2,
        next: {
            val:3,
            next: {
                val:4,
                next: {
                    val:5,
                    next: null
                }
            }
        }
    }
}   

```

## 链表结点的创建
```
function ListNode(val) {
    this.val = val;
    this.next = null;
}
const node = new ListNode(1)  
node.next = new ListNode(2)
```

### 链表元素的添加和删除
链表元素的添加和删除操作，本质上都是在围绕 next 指针做文章。

- 在尾部添加结点相对比较简单 我们改变一个 next 指针就行
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97312baddfb342128ffb9c205bedccac~tplv-k3u1fbpfcp-jj-mark:2722:0:0:0:q75.awebp)

- 如何在两个结点间插入一个结点?
由于链表有时会有头结点，这时即便你是往链表头部增加结点，其本质也是“在头结点和第一个结点之间插入一个新结点”。所以说，任意两结点间插入一个新结点这种类型的增加操作，将会是链表基础中的一个关键考点。

dummy 头结点

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faf00f911dc04864ae52a6343dacafa2~tplv-k3u1fbpfcp-jj-mark:2722:0:0:0:q75.awebp)

### 链表元素的删除
重点不是定位目标结点，而是定位目标结点的前驱结点。

## 链表和数组的辨析

我们假设数组的长度是 n，那么因增加/删除操作导致需要移动的元素数量，就会随着数组长度 n 的增大而增大，呈一个线性关系。所以说数组增加/删除操作对应的复杂度就是 O(n)。

- 数组一定是连续的吗？
const arr = [1,2,3,4]
它是一个纯数字数组，那么对应的确实是连续内存。
```
const arr = ['haha', 1, {a:1}]
```
JS 数组不再具有数组的特征，其底层使用哈希映射分配内存空间，是由对象链表来实现的。

说起来有点绕口，但大家谨记“JS 数组未必是真正的数组”即可。

链表有一个明显的优点，就是添加和删除元素都不需要挪动多余的元素。

- 高效的增删操作
在链表中，添加和删除操作的复杂度是固定的
- 麻烦的访问操作

## 合并两个有序链表（Merge Two Sorted Lists）

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

因为我们需要创建一个新链表的头，但一开始不知道哪个节点最小（即真正的头结点）。
使用一个 dummy 哨兵节点作为“假头”，可以避免对头结点做特殊处理，简化代码逻辑。
最终返回 dummy.next 即可。

```
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // 创建 dummy 哨兵节点，简化边界处理
    const dummy = new ListNode(0);
    let current = dummy; // current 指针用于构建新链表

    // 双指针遍历两个链表
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // 将剩余非空部分直接接上（因为输入是有序的）
    current.next = list1 !== null ? list1 : list2;

    // 返回真正的头节点（dummy.next）
    return dummy.next;
};
```


```
链表、双指针、快慢指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
 如果链表无环，快指针会先到达 null。
如果链表有环，快指针最终会在环内“追上”慢指针（因为每次快指针比慢指针多走一步，在环里相对速度为 1）。
时间复杂度：O(n)，空间复杂度：O(1)（只用两个指针）。
var hasCycle = function(head) {
    if (!head || !head.next) {
        return false;
    }

    let slow = head;      // 慢指针，每次走 1 步
    let fast = head.next; // 快指针，每次走 2 步

    while (slow !== fast) {
        if (!fast || !fast.next) {
            // 快指针走到尽头，说明无环
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }

    // 快慢指针相遇，说明有环
    return true;
};
```