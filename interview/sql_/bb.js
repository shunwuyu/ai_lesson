function test_2_wei_bag_problem1() {
    let weight = [1, 3, 4];
    let value = [15, 20, 30];
    let bagweight = 4;
    // 二维数组
    let dp = new Array(weight.length).fill(null).map(() => new Array(bagweight + 1).fill(0));
    
    // 初始化
    for (let j = weight[0]; j <= bagweight; j++) {
        dp[0][j] = value[0];
    }

    // 遍历物品
    for (let i = 1; i < weight.length; i++) {
        // 遍历背包容量
        for (let j = 0; j <= bagweight; j++) {
            if (j < weight[i]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
            }
        }
    }
    return dp[weight.length - 1][bagweight];
}