[72. 编辑距离](https://leetcode.cn/problems/edit-distance/description/)

- Levenshtein Distance LD 莱文斯坦距离 1965 俄罗斯
    Edit Distance
    两个字符之间，由一个转换成另一个所需的最少编辑操作次数。
    操作包括：
        - 将其中一个字符替换成另一个字符
        - 插入一个字符
        - 删除一个字符

1. kitten->sitten  k->s  替换
2. sitten->sittin  e->i  替换
3. sittin->sitting g  插入

- 最值问题
- LD(M, N) 两个字符串的长度
- 矩阵  从左上角到右下角 每个水平或垂直跳转分别对应一个插入或一个删除。
- 操作成本为1， 如果不匹配，则代价为1，否则为0
    左加1（M加1），上加1（N加1）左上加0（没有）
- 不等 左  左上 上 三个位置取最小值 + 1， 添加到[i][j]
- 最右下角的数字  局部最优  全局最优



- 挺难的,   最少的操作次数 word1->word2

- 添加一个元素, 删除一个元素, 替换一个元素
    word1 = "horse", word2 = "ros
    horse -> rorse (将 'h' 替换为 'r')
    rorse -> rose (删除 'r')
    rose -> ros (删除 'e')

- intention     execution
    intention -> inention (删除 't')
    inention -> enention (将 'i' 替换为 'e'
    enention -> exention (将 'n' 替换为 'x'
    exention -> exection (将 'n' 替换为 'c'
    exection -> execution (插⼊ 'u'

  word2 -> word1  逆向

- dp数组
    二维的 dp[i][j]  含义是?
    以i-1为结尾的word1和j-1为结尾的word2的最少操作次数? 空串开始

- 递推公式
    dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1, // 替换操作
            Math.min(dp[i][j - 1] + 1, // 插入操作
                     dp[i - 1][j] + 1) // 删除操作
    );

    if(word[i-1] == word[j-1]) {
        不需要操作  dp[i][j] = dp[i-1][j-1]
    } else {
        增    
        删   dp[i-1][j] + 1  dp[i][j-1] + 1  两个方向
        替换

        word1   ab   
        word2   a   + b  增    删除和加是一样的  包含

        ab
        ac  替换  
        dp[i-1][j-1] + 1
    }

