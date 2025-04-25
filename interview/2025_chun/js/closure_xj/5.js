function startTimer() {
    const data = { count: 0 };
    
    setInterval(() => {
        data.count++;
        console.log(data.count);
    }, 1000);
}

function startTimer() {
    const data = { count: 0 };
    const timerId = setInterval(() => {
        data.count++;
        console.log(data.count);
        
        if (data.count >= 10) {
            clearInterval(timerId);
        }
    }, 1000);
    
    return () => clearInterval(timerId); // 返回清理函数
}