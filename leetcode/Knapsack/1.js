function knapsack(bagWeight, weights, values) {
    let n = weights.length;
    let dp = new Array(n).fill(0).map(() => new Array(bagWeight + 1).fill(0));

    for (let j = weights[0]; j <= bagWeight; j++) {
        dp[0][j] = values[0];
    }
    // console.log(dp)

    for(let i = 1; i < n; i++) { 
        // 遍历物品 从1 开始， 是因为初始化时搞了
            for(let j = 0; j <= bagWeight; j++) { 
            // 遍历背包容量
                if (j < weights[i]) dp[i][j] = dp[i - 1][j]; // 这个是为了展现dp数组里元素的变化
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i]] + values[i]);
            }
        }
    console.log(dp)
    return dp[n-1][bagWeight]
}

console.log(knapsack(3, [1, 3, 4], [15, 10, 30]));