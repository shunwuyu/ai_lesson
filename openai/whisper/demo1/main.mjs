import fs from 'fs';
import axios from 'axios';
import OpenAI from 'openai';

// 配置 OpenAI API 密钥
// const configuration = new Configuration({
  
// });

const client = new OpenAI({
    apiKey: 'sk-2br8WRKLJx86xrViCWO5WTCU6vVQhIcdG2a5k4r8MvRzmCS6',
    baseURL:'https://api.agicto.cn/v1'
});

async function textToSpeech() {
  try {
    console.log('/////////')
    const response = await client.audio.speech.create({
      model: "gpt-4o-mini-tts", // 文本转语音模型
      voice: "alloy",            // 可选声音：alloy, verse, coral, sage, shimmer 等
      input: "你家猫",
    });
    // 将响应数据转换为 Buffer
    // 网络响应（response）中的原始二进制数据（arrayBuffer() 返回 ArrayBuffer）
    // 使用 Buffer.from() 将其转换为 Node.js 中常用的 Buffer 实例
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync("output.mp3", buffer);

    console.log("✅ 已生成语音文件：output.mp3");

    // 假设 API 返回一个 URL 链接到音频文件
    // const audioUrl = response.data.audio_url;
    // console.log(audioUrl, '/////')
    // const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });

    // // 将音频数据保存为 MP3 文件
    // fs.writeFileSync('output.mp3', audioResponse.data);

    // console.log('音频文件已保存为 output.mp3');
  } catch (error) {
    console.error('文字转语音失败:', error);
  }
}

textToSpeech();
