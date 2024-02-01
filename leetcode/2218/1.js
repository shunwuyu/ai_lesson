function maxValueOfCoins(piles, k) {
    // 状态转移方程f[i], 0 dummy  初始都为0
    let f = new Array(k + 1).fill(0);
    console.log(f);
    let sumN = 0;

    for (let pile of piles) {
        // 当前pile的长度
        let n = pile.length;
        // 计算每个堆叠的前缀和
        // pile 里的值是前面值的和
        for (let i = 1; i < n; i++) {
            pile[i] += pile[i - 1];
        }
        // console.log(pile)
    // 更新 sumN 为当前栈集合中前 i 个栈大小之和的最小值（不超过 k）
    // 一个栈全拿 n , k < n k, k > n 拿多少个？ 
        sumN = Math.min(sumN + n, k);
        console.log(sumN)
    // 枚举所有可能的组合数 j，并根据物品体积计算最大价值
    // 递减式的去遍历
        for (let j = sumN; j > 0; j--) {
        // 遍历当前堆叠中前 min(n, j) 个元素
        // w 是当前物品体积，v 是当前物品价值
            for (let w = 0, v = pile[0]; w < Math.min(n, j); w++, v = pile[w]) {
        // 注意：此处由于数组下标从 0 开始，因此物品体积对应的下标应为 w
                f[j] = Math.max(f[j], f[j - w - 1] + v);
            }
        }
    }

    return f[k];
}

console.log(maxValueOfCoins([[1,100,3],[7,8,9]], 4))