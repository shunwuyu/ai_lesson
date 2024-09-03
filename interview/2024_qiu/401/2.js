// 贪心算法
// 贪心算法是在每个决策点都选择当前看起来最优的选择，
// 以期望最终能得到全局最优解的算法策略。
// 贪心算法的本质就是取左侧的最小值，取右侧的最大值
function maxProfit(price) {
    let low = Infinity;
    let reuslt = 0;
    for (let i = 0; i < price.length; i++) {
        low = Math.min(low, price[i]); // 取左侧最小价格
        reuslt = Math.max(reuslt, price[i] - low); // 直接取最大区间利润
    }
    return result
}
// 时间复杂度O(n)