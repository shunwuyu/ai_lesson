function maxProfit(prices) {
    // 初始化最大利润为0。
    let maxp = 0;
    // 初始化最小价值（最低买入价）为数组中的第一个元素，即第一天的股票价格。
    let minv = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] - minv > maxp) {
            maxp = prices[i] - minv;
        }
        if (prices[i] < minv) {
            minv = prices[i];
        }
    }
    
    return maxp;
}

// Example usage:
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // Output: 5 (Buy on day 2 (price = 1) and sell on day 5 (price = 6))