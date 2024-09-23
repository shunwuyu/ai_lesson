let mediaRecorder;
let audioChunks = [];
let isRecording = false;

document.addEventListener('DOMContentLoaded', () => {
  const recordButton = document.getElementById('recordButton');
  const prompt = document.getElementById('prompt');
  const result = document.getElementById('result');
  const copyButton = document.getElementById('copyButton');
  const rerecordButton = document.getElementById('rerecordButton');

  recordButton.addEventListener('click', toggleRecording);
  copyButton.addEventListener('click', copyText);
  rerecordButton.addEventListener('click', resetRecording);

  async function toggleRecording() {
    if (!isRecording) {
      await startRecording();
    } else {
      stopRecording();
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = sendAudioToWhisper;

      audioChunks = [];
      mediaRecorder.start();
      isRecording = true;
      recordButton.textContent = '停止';
      recordButton.classList.add('recording');
      prompt.textContent = '录音进行中...';
    } catch (error) {
      console.error('Error starting recording:', error);
      prompt.textContent = '无法开始录音，请检查麦克风权限';
    }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      isRecording = false;
      recordButton.textContent = '翻译中';
      recordButton.disabled = true;
      prompt.textContent = '翻译中...';
    }
  }

  function sendAudioToWhisper() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    // 这里应该使用实际的 Whisper API 端点和密钥
    fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY_HERE'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      result.textContent = data.text;
      prompt.textContent = '翻译完成';
      copyButton.style.display = 'inline-block';
      rerecordButton.style.display = 'inline-block';
      recordButton.style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      prompt.textContent = '翻译失败，请重试';
      recordButton.textContent = '录';
      recordButton.disabled = false;
    });
  }

  function copyText() {
    navigator.clipboard.writeText(result.textContent).then(() => {
      prompt.textContent = '文本已复制';
    }, () => {
      prompt.textContent = '复制失败，请手动复制';
    });
  }

  function resetRecording() {
    result.textContent = '';
    prompt.textContent = '点击下方按钮录制语音并翻译成英文';
    copyButton.style.display = 'none';
    rerecordButton.style.display = 'none';
    recordButton.style.display = 'inline-block';
    recordButton.textContent = '录';
    recordButton.disabled = false;
    recordButton.classList.remove('recording');
  }
});
