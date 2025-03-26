// main.js - 主线程
const hashWorker = new Worker('./hashWorker.js');

// 文件选择处理
document.getElementById('fileInput').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    console.log('开始计算文件hash:', file.name);
    
    // 将文件发送给 Worker
    hashWorker.postMessage({
        file,
        type: 'calculateHash'
    });
});

// 接收 Worker 计算的结果
hashWorker.onmessage = function(e) {
    if (e.data.type === 'progress') {
        // 更新进度条
        document.getElementById('progress').value = e.data.progress;
    } else if (e.data.type === 'complete') {
        console.log('文件hash值:', e.data.hash);
        document.getElementById('result').textContent = e.data.hash;
    }
};