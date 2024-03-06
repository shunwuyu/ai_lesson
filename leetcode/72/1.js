/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
  
    // 初始化一个(m+1) x (n+1)的矩阵，第一行和第一列分别表示空串到word1前i个字符、空串到word2前j个字符的距离
    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));
  
    // 初始化边界条件：空字符串转换成任意长度的字符串至少需要该字符串的长度次操作
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
  
    // 动态规划填充矩阵
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]; // 如果两个字符相等，则不需要消耗操作次数
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1, // 替换操作
            Math.min(dp[i][j - 1] + 1, // 插入操作
                     dp[i - 1][j] + 1) // 删除操作
          );
        }
      }
    }
  
    return dp[m][n]; // 最终答案位于dp数组右下角
  }

console.log(minDistance('horse', 'ros'))