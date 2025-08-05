// compress.worker.js
self.onmessage = async function (e) {
    const { imgData, quality = 0.8 } = e.data;
    try {
      // 将 base64 转为 ImageBitmap
      const bitmap = await createImageBitmap(await (await fetch(imgData)).blob());
  
      // 创建 OffscreenCanvas 用于绘制压缩
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0);
  
      // 输出压缩后的 base64
      const compressedBlob = await canvas.convertToBlob({
        type: 'image/jpeg',
        quality
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        self.postMessage({
          success: true,
          data: reader.result // 压缩后的 dataURL
        });
      };
      reader.readAsDataURL(compressedBlob);
    } catch (err) {
      self.postMessage({ success: false, error: err });
    }
  };
  