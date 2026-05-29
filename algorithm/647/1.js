var countSubstrings = function(s) {
  let n = s.length;
  let result = 0;
  let dp = new Array(n).fill(0).map(() => new Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
      for (let j = i; j < n; j++) {
          if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
              result++;
              dp[i][j] = true;
          }
      }
  }
  return result;
};