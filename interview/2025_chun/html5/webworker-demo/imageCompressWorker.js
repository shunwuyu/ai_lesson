// imageWorker.js - Worker线程
self.onmessage = function(e) {
  if (e.data.type === 'process') {
    const blob = e.data.imageData;
    // 将base64字符串转换为Blob对象
    const base64Data = blob.split(',')[1];
    const binaryData = atob(base64Data);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
    }
    const imageBlob = new Blob([array], {type: 'image/jpeg'});

    // 直接从Blob创建ImageBitmap
    createImageBitmap(blob).then(imageBitmap => {
        // 创建 OffscreenCanvas 处理图片
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const ctx = canvas.getContext('2d');
        
        // 绘制图片到canvas
        ctx.drawImage(imageBitmap, 0, 0);
        
        // 假设我们想要转换为JPEG格式并设置压缩质量
        return canvas.convertToBlob({type: 'image/jpeg', quality: 0.7});
    }).then(compressedBlob => {
        // 将压缩后的图片转换为base64字符串
        const reader = new FileReader();
        reader.onloadend = () => {
            self.postMessage({
                processedImage: reader.result
            });
        };
        reader.readAsDataURL(compressedBlob);
    }).catch(error => console.error('图片处理出错:', error));
  }
};