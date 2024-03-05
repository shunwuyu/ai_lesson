function test_1_wei_bag_problem() {
    const weight = [1, 3, 4];
    const value = [15, 20, 30];
    const bagWeight = 4;
    
    // 初始化
    const dp = new Array(bagWeight + 1).fill(0);
    
    for(let i = 0; i < weight.length; i++) { // 遍历物品
        for(let j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量
            dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
    }
    
    console.log(dp[bagWeight]);
}