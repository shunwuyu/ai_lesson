function add(a, b) {
    return a + b;
}

// 开发者以为在算 10 + 5
const result = add(10, "5"); 

console.log(result); 
// 输出: "105"  <-- 这是一个逻辑 Bug！
// 程序没有崩溃，但你的财务报表或用户余额现在多了 100 倍。