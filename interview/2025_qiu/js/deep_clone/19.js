let obj = { name : 'ConardLi'}
const target = new Map();
target.set(obj,'code秘密花园');
obj = null;

// 虽然我们手动将obj，进行释放，然是target依然对obj存在强引用关系，
// 所以这部分内存依然无法被释放。


// 如果是WeakMap的话，target和obj存在的就是弱引用关系，
// 当下一次垃圾回收机制执行时，这块内存就会被释放掉。
let obj2 = { name : 'ConardLi'}
const target2 = new WeakMap();
target2.set(obj2,'code秘密花园');
obj2 = null;