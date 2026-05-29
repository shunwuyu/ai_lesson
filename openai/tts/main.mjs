// index.js
import fs from "fs/promises";      // 使用 promises 版本方便 async/await
import { Buffer } from "buffer";   // 如需
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: 'sk-UYTJpmWZ1UIDvbqsnM8AQOaXuHIa6REcs1tc1OTaLOYrUiXM',
  baseURL: 'https://api.agicto.cn/v1'
});

async function textToSpeechAndSave(text, outputFilePath = "output.mp3") {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",        // 模型名称，根据最新文档可能有 “tts-1-hd” 等。 :contentReference[oaicite:2]{index=2}
      voice: "alloy",        // 选择一种声音名称，如 “alloy” :contentReference[oaicite:3]{index=3}
      input: text,
      response_format: "mp3" // 明确要求 MP3 输出（默认可能即是） :contentReference[oaicite:4]{index=4}
    });

    // response 是一个类似 Blob/arrayBuffer 的二进制流／缓冲
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(outputFilePath, buffer);
    console.log(`已生成语音并保存为 ${outputFilePath}`);
  } catch (err) {
    console.error("TTS 生成或写入出错：", err);
  }
}

// 调用示例：
const text = "Hello, this is a test of OpenAI text to speech, saving to an mp3 file.";
textToSpeechAndSave(text, "tts_output.mp3");
