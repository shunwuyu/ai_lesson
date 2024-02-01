// 01 背包
function knapsack01(weights, values, capacity) {
    let n = weights.length;
    
    // 初始化一个长度为capacity+1的dp数组
    let dp = new Array(capacity + 1).fill(0);
    
    // 动态规划状态转移方程
    // 这个倒序遍历（从大到小）的原因是基于以下逻辑
    // 我们要确保在计算某个容量 w 时，之前所有更小的容量（即 w - weights[j] 
    // 对于任意 j，且 weights[j] <= w）都已经通过递归计算得到了最优解。
    // 如果我们正向遍历，即从较小的容量到较大的容量，
    // 当遇到一个特定的物品和容量组合时，可能还没有计
    // 算出它能够放入的更小容量下的最大价值，因为我们是从小到大的顺序处理的。
    // 而倒序遍历可以保证，在决定是否将第 i 件物品放入容量为
    //  w 的背包时，我们已经知道对于所有小于等于 w - weights[i]
    //   的容量所对应的最大价值。
    for (let i = 0; i < n; i++) {
      for (let w = capacity; w >= weights[i]; w--) { 
        // 从大到小遍历当前容量，这样保证了先考虑更重的物品
        dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
      }
    }
    
    return dp[capacity];
  }
  
  // 示例用法
  let weights = [2, 3, 4, 5];
  let values = [6, 10, 12, 15];
  let capacity = 8;
  
  console.log(knapsack01(weights, values, capacity)); 