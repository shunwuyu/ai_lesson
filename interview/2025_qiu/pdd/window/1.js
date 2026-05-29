var maxSlidingWindow = function(nums, k) {
    if (!nums || k === 0) return [];
    
    const result = [];
    const deque = []; // 存储下标，维护对应值单调递减
    
    for (let i = 0; i < nums.length; i++) {
        // 移除队列中小于当前元素的值（它们没机会了）
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        // 当前元素入队
        deque.push(i);
        
        // 移除滑出窗口的元素（下标过期）
        if (deque[0] <= i - k) {
            // 双端
            deque.shift();
        }
        
        // 窗口形成后，记录最大值
        if (i >= k - 1) {
          // 递减
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
};