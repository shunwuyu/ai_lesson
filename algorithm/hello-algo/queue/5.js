/* 初始化双向队列 */
// JavaScript 没有内置的双端队列，只能把 Array 当作双端队列来使用
const deque = [];

/* 元素入队 */
deque.push(2);
deque.push(5);
deque.push(4);
// 请注意，由于是数组，unshift() 方法的时间复杂度为 O(n)
deque.unshift(3);
deque.unshift(1);

/* 访问元素 */
const peekFirst = deque[0];
const peekLast = deque[deque.length - 1];

/* 元素出队 */
// 请注意，由于是数组，shift() 方法的时间复杂度为 O(n)
const popFront = deque.shift();
const popBack = deque.pop();

/* 获取双向队列的长度 */
const size = deque.length;

/* 判断双向队列是否为空 */
const isEmpty = size === 0;