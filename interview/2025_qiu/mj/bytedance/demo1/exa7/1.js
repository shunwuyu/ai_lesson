function merge(intervals) {
    // 边界情况：如果区间数量小于等于1，直接返回
    if (intervals.length <= 1) return intervals;
    // 快排 On(log n)
    // 1. 按照每个区间的起始位置升序排序
    intervals.sort((a, b) => a[0] - b[0]);

    // 2. 初始化结果数组，先放入排序后的第一个区间
    const merged = [intervals[0]];

    // 3. 遍历排序后的剩余区间
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i]; // 当前遍历到的区间
        const lastMergedInterval = merged[merged.length - 1]; // 结果数组中最后一个（即最近合并的）区间

        // 4. 判断当前区间与已合并的最后一个区间是否重叠
        // 重叠条件：当前区间的起点 <= 已合并区间的终点
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // 有重叠：合并！更新已合并区间的终点为两者终点的最大值
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // 无重叠：将当前区间直接添加到结果数组末尾
            merged.push(currentInterval);
        }
    }

    // 5. 返回合并后的结果
    return merged;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));

// 总时间复杂度 = O(n log n) + O(n) = O(n log n)
// 空间复杂度：O(n) 需要额外的 merged 数组来存储结果
// 这个合并区间算法的时间复杂度是 O(n log n)，其中 n 
// 是区间的数量。排序是主要的性能瓶颈，而合并操作只需要线性时间。