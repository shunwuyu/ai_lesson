function mincostTickets(days, costs) {
    const lastTravelDay = days[days.length - 1]; // 获取最后一天的出行日
    const dp = Array(lastTravelDay + 1).fill(0); // 创建dp数组并初始化为0
    const isTravelDay = Array(lastTravelDay + 1).fill(false); // 标记是否是出行日

    // 将出行日标记出来
    for (let day of days) {
        isTravelDay[day] = true;
    }

    for (let i = 1; i <= lastTravelDay; i++) {
        if (!isTravelDay[i]) {
            dp[i] = dp[i - 1]; // 如果不是出行日，则花费和前一天相同
        } else {
            // 计算三种票对应的最小花费
            const cost1 = dp[i - 1] + costs[0]; // 1天票
            const cost7 = dp[Math.max(i - 7, 0)] + costs[1]; // 7天票
            const cost30 = dp[Math.max(i - 30, 0)] + costs[2]; // 30天票
            dp[i] = Math.min(cost1, cost7, cost30); // 取三者中的最小值
        }
    }

    return dp[lastTravelDay]; // 返回到最后一天的最小花费
}

// 示例调用
const days = [1, 4, 6, 7, 8, 20];
const costs = [2, 7, 15];
console.log(mincostTickets(days, costs)); // 应输出最低票价