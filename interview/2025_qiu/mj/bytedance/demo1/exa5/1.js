/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 使用 Map 既能存储键值对，又能保证顺序（最新使用放最后）
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.cache.has(key)) {
        return -1; // 缓存中不存在，返回 -1
    }
    const value = this.cache.get(key);
    // 将访问的键移到 Map 的末尾（表示最近使用）
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // 如果键已存在，先删除（为了更新到末尾）
    if (this.cache.has(key)) {
        this.cache.delete(key);
    }
    // 直接设置（新键或更新的键都在末尾）
    this.cache.set(key, value);
    
    // 检查容量，如果超了，删除最久未使用的（即 Map 的第一个元素）
    if (this.cache.size > this.capacity) {
        // Map 的 keys() 返回一个迭代器，.next().value 取第一个键
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
    }
};

// 使用示例：
// const lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// console.log(lRUCache.get(1));    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// console.log(lRUCache.get(2));    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// console.log(lRUCache.get(1));    // 返回 -1 (未找到)
// console.log(lRUCache.get(3));    // 返回 3
// console.log(lRUCache.get(4));    // 返回 4