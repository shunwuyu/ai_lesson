function polling(url, callback, interval = 1000) {
    let timer;

    const fetchData = () => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                callback(data); // 调用回调函数处理数据
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const startPolling = () => {
        fetchData(); // 初始请求
        timer = setInterval(fetchData, interval); // 定期请求
    };

    const stopPolling = () => {
        clearInterval(timer); // 清除定时器
    };

    return { startPolling, stopPolling };
}

// 使用示例
const pollingInstance = polling('https://api.example.com/data', (data) => {
    console.log('Received data:', data);
}, 5000); // 每5秒请求一次

// 启动轮询
pollingInstance.startPolling();

// 停止轮询（根据需要调用）
// pollingInstance.stopPolling();