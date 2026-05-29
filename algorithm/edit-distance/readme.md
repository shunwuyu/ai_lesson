[source](https://leetcode.cn/problems/edit-distance/description/)

最少操作数 动态规划

edit-place 又称Levenshtein距离  指两个字符串之间，由一个转成另一个所需的最少编辑操作次数

两个单词 word1 = "horse" word2 = "ros"

- 删除
- 替换
- 插入

3

horse->rorse h->r 替换
rorse -> rose 删除 r
rose -> ros 删除 e

动规五部曲 

- 确定dp 数组以及下标的含义

dp[i][j]为将字符串A的前i个字符转换为字符串B的前j个字符所需要的最小操作数。这里，dp[i][j]的状态依赖于之前的状态，即dp[i-1][j], dp[i][j-1], 和 dp[i-1][j-1]。

- 递推公式

  - word1[i-1] == word2[j-1] 不做
    dp[i][j] = dp[i-1][j-1]

  - word1[i-1] != word2[j-1]  编辑 增删改
    - 删 dp[i][j] = dp[i-1][j] + 1  word1 删除一个
      dp[i][j]=dp[i][j-1] + 1  word2 删除一个
    - 增 
      word2 加一个相当于word1 删除一个 一样 不用做
    - 改 dp[i][j] = dp[i-1][j-1] + 1
      i-2 j-2 加一个 
    if word1[i-1] == word2[j-1]
      dp[i][j] = dp[i-1][j-1]
    else
      dp[i][j] = min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1
- 初始化
  for(i=0;i<=word1.length;i++)
  dp[i][0] = i

  for (let j = 0; j < word2.length; j++)
  dp[0][j] = j

- 遍历顺序 从上到下 从左到右
  dp[i][j]依赖关系图

- 举例推导dp数组
  慢慢推导


