function maxProfit(prices) {
    // 初始化最大利润为0。
    let maxp = 0;
    // 初始化最小价值（最低买入价）为数组中的第一个元素，即第一天的股票价格。
    let minv = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        let temp = prices[i] - minv;
        if (temp < 0) {
            minv = prices[i];
        }else if (temp > maxp) {
            maxp = temp;
        }
    }
    
    return maxp;
}