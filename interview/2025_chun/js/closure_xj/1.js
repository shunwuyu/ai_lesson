// 经典问题
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i); // 输出 5 个 5
    }, 1000);
}

// 方案1：使用 let
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i); // 0,1,2,3,4
    }, 1000);
}

// 方案2：使用 IIFE
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j); // 0,1,2,3,4
        }, 1000);
    })(i);
}

// 方案3：使用 setTimeout 的第三个参数
for (var i = 0; i < 5; i++) {
    setTimeout((j) => {
        console.log(j); // 0,1,2,3,4
    }, 1000, i);
}