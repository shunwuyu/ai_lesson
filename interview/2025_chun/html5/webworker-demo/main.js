if (window.Worker) {
  const worker = new Worker('imageCompressWorker.js');

  document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const imgDataUrl = e.target.result;
      worker.postMessage({imgData: imgDataUrl, quality: 0.75});
    };
    reader.readAsDataURL(file);
  });

  worker.onmessage = function(e) {
    const output = document.getElementById('output');
    output.innerHTML = `<img src="${e.data}" />`;
  };

  worker.onerror = function(e) {
    console.error(`Error in worker: ${e.message}`);
  };
} else {
  console.log('您的浏览器不支持Web Workers。');
}
