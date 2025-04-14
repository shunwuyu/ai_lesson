function maxProfit(prices) {
    let maxp = 0;
    for (let i = 0; i < prices.length; ++i) {
        for (let j = i + 1; j < prices.length; ++j) {
            if (prices[j] - prices[i] > maxp) {
                maxp = prices[j] - prices[i];
            }
        }
    }
    return maxp;
}

// Example usage:
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // Output: 5