// 排序+双指针
// https://github.com/azl397985856/leetcode/blob/master/problems/455.AssignCookies.md
// 使用贪心思想，配合两个指针，每个饼干只尝试一次，成功则换下一个孩子来尝试，不成功则换下一个饼干🍪来尝试。

const findContentChildren = function (g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let gi = 0; // 胃口值 
    let sj = 0; // 饼干尺寸
    let res = 0;
    while (gi < g.length && sj < s.length) {
        // 当饼干 sj >= 胃口 gi 时，饼干满足胃口，更新满足的孩子数并移动指针
        if (s[sj] >= g[gi]) {
            gi++;
            sj++;
            res++;
        } else {
            // 当饼干 sj < 胃口 gi 时，饼干不能满足胃口，需要换大的
            sj++;
        }
    }
    return res;
};