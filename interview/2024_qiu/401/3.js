// 动态规划
// 贪心策略：每一步都贪心地选择当前看到的最低价格，并计算最大利润，而不存储所有可能的选择。
// 动态规划策略：会更多地关注如何从前面的计算中逐步构建出最优解，一般会涉及到子问题的存储和递推关系。
function maxProfit(prices) {
    let n = prices.length;
    if (n == 0) return 0;

    // dp[i] 表示前i天的最大利润
    let dp = new Array(n).fill(0);
    let minPrice = prices[0];

    for (let i = 1; i < n; i++) {
        // 在第i天卖出时的最大利润
        dp[i] = Math.max(dp[i - 1], prices[i] - minPrice);
        // 更新最低价格
        minPrice = Math.min(minPrice, prices[i]);
    }

    return dp[n - 1];
}