// hashWorker.js - Worker线程
importScripts('./node_modules/spark-md5/spark-md5.min.js');

self.onmessage = async function(e) {
    if (e.data.type === 'calculateHash') {
        const file = e.data.file;
        const chunkSize = 2 * 1024 * 1024; // 2MB chunks
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        
        let currentChunk = 0;
        
        const readNextChunk = async () => {
            const start = currentChunk * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = await file.slice(start, end).arrayBuffer();
            
            spark.append(chunk);
            currentChunk++;
            
            // 发送进度
            self.postMessage({
                type: 'progress',
                progress: (currentChunk / chunks) * 100
            });
            
            if (currentChunk < chunks) {
                // 继续读取下一块
                readNextChunk();
            } else {
                // 完成，发送结果
                const hash = spark.end();
                self.postMessage({
                    type: 'complete',
                    hash: hash
                });
            }
        };
        
        // 开始读取第一块
        readNextChunk();
    }
};