/**
 * 计算可以均分蛋糕的最大面积
 * @param {number[]} cakeSlices - 蛋糕的各个切片的面积数组（蛋糕按顺序切片）
 * @param {number} n - 需要分蛋糕的人数
 * @returns {number} 最大的均分面积
 */
function maxCakeArea(cakeSlices, n) {
    let left = 0; // 二分查找的左边界（最小可能的面积）
    let right = cakeSlices.reduce((sum, area) => sum + area, 0); // 总面积作为右边界
    let result = 0;
    
    /**
     * 检查是否可以将蛋糕切成 n+1 份，每份至少为 mid 面积
     * @param {number} mid - 目标均分面积
     * @returns {boolean} 是否可行
     */
    function canDivide(mid) {
        let count = 0;
        let currentSum = 0;
        
        for (let area of cakeSlices) {
            currentSum += area;
            if (currentSum >= mid) {
                count++; // 形成了一块符合条件的切片
                currentSum = 0; // 重新累加
            }
        }
        return count >= n + 1; // 需要至少形成 n+1 块
    }
    
    while (right - left > 1e-6) { // 精度控制
        let mid = (left + right) / 2;
        if (canDivide(mid)) {
            result = mid; // 记录当前可行的最大值
            left = mid; // 尝试更大的面积
        } else {
            right = mid; // 试图减少面积
        }
    }
    
    return result;
}

// 示例测试
const cakeSlices = [2, 3, 4, 5, 6]; // 蛋糕的各个连续部分面积
const n = 4; // 4 个人
console.log(maxCakeArea(cakeSlices, n)); // 输出最大均分面积