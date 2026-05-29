# 队列

## 如何用栈实现队列？

- 栈向队列的转化
  热度非常高的原因？
  一方面，它考察的确实是数据结构中的经典内容；
  另一方面，它又覆盖了两个大的知识点、足以检验出候选人编码基本功的扎实程度。

  - [leetcode](https://leetcode.cn/problems/implement-queue-using-stacks/description/)

  题目描述：使用栈实现队列的下列操作：
  push(x) -- 将一个元素放入队列的尾部。
  pop() -- 从队列首部移除元素。
  peek() -- 返回队列首部的元素。
  empty() -- 返回队列是否为空。

- 栈和队列的区别在哪里？
  栈，后进先出；队列，先进先出。
  用栈实现队列，说白了就是用栈实现先进先出的效果。
  让栈底的元素首先被取出，也就是让出栈序列被逆序。

  栈结构决定了栈底元素只能被死死地压在最底下，如何使它首先被取出呢？

  一个栈做不到的事情，我们用两个栈来做

  ### 解题分析
  - 
  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/171735fc8ee608ea~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

  现在问题是，怎么把第一个栈底下的那个 1 给撬出来。仔细想想，阻碍我们接触到 1 的是啥？是不是它头上的 3 和 2？那么如何让 3 和 2 给 1 让路呢？实际上咱们完全可以把这三个元素按顺序从 stack1 中出栈、然后入栈到 stack 2 里去：

  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/13/17173813ab3377b1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

  - 此时 1 变得触手可及。不仅如此，下一次我们试图出队 2 的时候，可以继续直接对 stack2 执行出栈操作——因为转移 2 和 3 的时候已经做过一次逆序了，此时 stack2 的出栈序列刚好就对应队列的出队序列。

  - 有同学会问，那如果 stack1 里入栈新元素怎么办？比如这样：

  ```
  /**
 * 初始化构造函数
 */
const MyQueue = function () {
  // 初始化两个栈
  this.stack1 = [];
  this.stack2 = [];
};

/**
* Push element x to the back of queue.
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function (x) {
  // 直接调度数组的 push 方法
  this.stack1.push(x);
};

/**
* Removes the element from in front of queue and returns that element.
* @return {number}
*/
MyQueue.prototype.pop = function () {
  // 假如 stack2 为空，需要将 stack1 的元素转移进来
  if (this.stack2.length <= 0) {
    // 当 stack1 不为空时，出栈
    while (this.stack1.length !== 0) {
      // 将 stack1 出栈的元素推入 stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 为了达到逆序的目的，我们只从 stack2 里出栈元素
  return this.stack2.pop();
};

/**
* Get the front element.
* @return {number}
* 这个方法和 pop 唯一的区别就是没有将定位到的值出栈
*/
MyQueue.prototype.peek = function () {
  if (this.stack2.length <= 0) {
    // 当 stack1 不为空时，出栈
    while (this.stack1.length != 0) {
      // 将 stack1 出栈的元素推入 stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 缓存 stack2 的长度
  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1];
};

/**
* Returns whether the queue is empty.
* @return {boolean}
*/
MyQueue.prototype.empty = function () {
  // 若 stack1 和 stack2 均为空，那么队列空
  return !this.stack1.length && !this.stack2.length;
};

  ```

## 认识双端队列

双端队列就是允许在队列的两端进行插入和删除的队列。
体现在编码上，最常见的载体是既允许使用 pop、push 同时又允许使用 shift、unshift 的数组：

```
const queue = [1,2,3,4] // 定义一个双端队列   
queue.push(1) // 双端队列尾部入队 
queue.pop() // 双端队列尾部出队   
queue.shift() // 双端队列头部出队 
queue.unshift(1) // 双端队列头部入队
```
- 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

解释: 滑动窗口的位置
---------------
[1 3 -1] -3 5 3 6 7
1 [3 -1 -3] 5 3 6 7
1 3 [-1 -3 5] 3 6 7
1 3 -1 [-3 5 3] 6 7
1 3 -1 -3 [5 3 6] 7
1 3 -1 -3 5 [3 6 7]

![](https://leetcode.cn/problems/sliding-window-maximum/description/)

按照题意，它要求我们在遍历数组的过程当中，约束一个窗口。
窗口的本质其实就是一个范围
约束范围，可以用双指针？

left 左指针、定义一个 right 右指针，分别指向窗口的两端即可：

接下来我们可以把这个窗口里的数字取出来，直接遍历一遍、求出最大值，然后把最大值存进结果数组。这样第一个窗口的最大值就有了。

接着按照题意，窗口每次前进一步（左右指针每次一起往前走一步），此时的范围变成了这样：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/171915c9c9f694db~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

2.js 

时间复杂度是多少？

这波操作里其实涉及了两层循环，外层循环是 while，它和滑动窗口前进的次数有关。滑动窗口前进了多少次，while 就执行了多少次。

O(n^2)

假设数组的规模是 n，那么从起始位置开始，滑动窗口每次走一步，一共可以走 n - k 次。注意别忘了初始位置也算作一步的，因此一共走了 n - k + 1次。然后每个窗口内部我们又会固定执行 k 次遍历。注意 k 可不是个常数，它和 n 一样是个变量。因此这个时间复杂度简化后用大 O 表示法可以记为 O(kn)。

O(kn) 虽然不差，但对这道题来说，还不是最好。因此在面试过程中，如果你采用了上面这套解法做出了这个题，面试官有 99% 的可能性会追问你：这个题可以优化吗？如何优化？（或者直接问你，你能在线性时间复杂度内解决此题吗？）

变 O(kn) 为 O(n)?

双端队列解法

怎么做才能丢掉这个 k?
k 之所以会产生，是因为我们现在只能通过遍历来更新最大值。那么更新最大值，有没有更高效的方法呢？

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/171916004417d924~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

此时滑动窗口内的元素少了一个 1，增加了一个 -3——减少的数不是当前最大值，增加的数也没有超越当前最大值，因此最大值仍然是 3。此时我们不禁要想：如果我们能在窗口发生移动时，只根据发生变化的元素对最大值进行更新，那复杂度是不是就低很多了？

双端队列可以完美地帮助我们达到这个目的。

使用双端队列法，核心的思路是维护一个有效的递减队列。
维护递减队列可快速获取当前窗口最大值，并保证队首始终为有效最大元素。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/19/171916b7462c1b87~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

- 如果试图推入的元素（当前元素）大于队尾元素，则意味着队列的递减趋势被打破了。此时我们需要将队列尾部的元素依次出队（注意由于是双端队列，所以队尾出队是没有问题的）、直到队尾元素大于等于当前元素为止，此时再将当前元素入队。    
  对头是最大的

- 如果试图推入的元素小于队列尾部的元素，那么就不需要额外的操作，直接把当前元素入队即可。

当遍历到的元素个数达到了 k 个时，意味着滑动窗口的第一个最大值已经产生了，我们把它 push 进结果数组里：

总结一下每一步都做了什么：

检查队尾元素，看是不是都满足大于等于当前元素的条件。如果是的话，直接将当前元素入队。否则，将队尾元素逐个出队、直到队尾元素大于等于当前元素为止。
将当前元素入队
检查队头元素，看队头元素是否已经被排除在滑动窗口的范围之外了。如果是，则将队头元素出队。
判断滑动窗口的状态：看当前遍历过的元素个数是否小于 k。如果元素个数小于k，这意味着第一个滑动窗口内的元素都还没遍历完、第一个最大值还没出现，此时我们还不能动结果数组，只能继续更新队列；如果元素个数大于等于k，这意味着滑动窗口的最大值已经出现了，此时每遍历到一个新元素（也就是滑动窗口每往前走一步）都要及时地往结果数组里添加当前滑动窗口对应的最大值（最大值就是此时此刻双端队列的队头元素）。

维持队列的递减性：确保队头元素是当前滑动窗口的最大值。这样我们每次取最大值时，直接取队头元素即可。
这一步没啥好说的，就是在维持队列递减性的基础上、更新队列的内容。
维持队列的有效性：确保队列里所有的元素都在滑动窗口圈定的范围以内。
排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况。

```
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length;
  // 初始化结果数组
  const res = [];
  // 初始化双端队列
  const deque = [];
  // 开始遍历数组
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素时
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
      deque.pop();
    }
    // 入队当前元素索引（注意是索引）
    deque.push(i);
    // 当队头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将队头元素索引出队
      deque.shift();
    }
    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }
  // 返回结果数组
  return res;
};

```