const worker = new Worker('./imageCompressWorker.js');

function handleFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function compressFile(file) {
  const imgDataUrl = await handleFile(file);
  // console.log(imgDataUrl,'....')
  worker.postMessage({
    imgData: imgDataUrl,
    quality: 0.1
  });
}

worker.onmessage = function(e) {
  if (e.data.success) {
    // console.log('压缩后的 base64：', e.data.data);
    // e.data.data 就是压缩后的 dataURL，可以用来预览上传等
    document.getElementById('output').innerHTML = `
    <img src="${e.data.data}" />
    `
  } else {
    console.error('压缩失败', e.data.error);
  }
};

document.getElementById('fileInput').addEventListener('change', async function(e) {
  const file = e.target.files[0];
  if (!file) return;
  await compressFile(file);
});
