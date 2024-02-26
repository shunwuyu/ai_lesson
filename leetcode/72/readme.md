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

