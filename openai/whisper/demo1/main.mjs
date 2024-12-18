import fs from 'fs';
import axios from 'axios';
import OpenAI from 'openai';

// 配置 OpenAI API 密钥
// const configuration = new Configuration({
  
// });

const client = new OpenAI({
    apiKey: 'sk-Gl1ASRfqtsM8Y89sWlInTrElCDUja0M2X7B4lIQrY1oThSkV',
    baseUrl:'https://api.302.ai/v1'
});

async function textToSpeech() {
  try {
    const response = await client.audio.speech.create({
      model: 'whisper-1',
      messages: [{ role: 'system', content: '你好，欢迎使用 OpenAI 文字转语音功能。' }],
    });

    // 假设 API 返回一个 URL 链接到音频文件
    const audioUrl = response.data.audio_url;
    console.log(audioUrl, '/////')
    const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });

    // 将音频数据保存为 MP3 文件
    fs.writeFileSync('output.mp3', audioResponse.data);

    console.log('音频文件已保存为 output.mp3');
  } catch (error) {
    console.error('文字转语音失败:', error);
  }
}

textToSpeech();
