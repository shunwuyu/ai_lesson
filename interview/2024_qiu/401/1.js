// 暴力破解
function maxProfit(prices) {
    let maxProfit = 0;
    for (let buy = 0; buy < prices.length; buy++) { // 遍历每一天作为买入日
        for (let sell = buy + 1; sell < prices.length; sell++) { // 从买入日之后开始遍历作为卖出日
            const profit = prices[sell] - prices[buy]; // 计算买入和卖出之间的利润
            if (profit > maxProfit) { // 如果此次交易利润更高，则更新最大利润
                maxProfit = profit;
            }
        }
    }
    return maxProfit;
}

// 示例
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // 输出应为 5 （在价格为1的时候买入，在价格为6的时候卖出）
// 时间复杂度O(n^2)  空间复杂度 O(1)