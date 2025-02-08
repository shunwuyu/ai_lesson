function editDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  // 创建一个二维数组dp，大小为(len1+1) x (len2+1)
  // 初始化时，dp[i][0]表示将str1前i个字符转换为空字符串需要的操作数，即i次删除操作
  // dp[0][j]表示将空字符串转换为str2前j个字符需要的操作数，即j次插入操作
  let dp = Array.from({length: len1 + 1}, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
      dp[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
      dp[0][j] = j;
  }

  // 填充dp数组
  for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
          if (str1[i - 1] === str2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1]; // 如果当前字符相同，则不需要额外操作
          } else {
              dp[i][j] = Math.min(
                  dp[i - 1][j] + 1,    // 删除操作
                  dp[i][j - 1] + 1,    // 插入操作
                  dp[i - 1][j - 1] + 1 // 替换操作
              );
          }
      }
  }

  // dp[len1][len2]保存的就是最终的编辑距离
  return dp[len1][len2];
}

// 示例调用
console.log(editDistance("intention", "execution")); // 输出：5