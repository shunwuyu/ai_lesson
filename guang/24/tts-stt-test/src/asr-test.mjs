import "dotenv/config";
import tencentcloud from "tencentcloud-sdk-nodejs";// 腾讯云 各种服务 SDK
import fs from "node:fs";

const SECRET_ID = process.env.SECRET_ID;
const SECRET_KEY = process.env.SECRET_KEY;
// Automatic Speech Recognition 自动语音识别
const AsrClient = tencentcloud.asr.v20190614.Client; // 语音识别服务
const AUDIO_FILE = './output3.mp3';

const client = new AsrClient({
  credential: {
    secretId: SECRET_ID,
    secretKey: SECRET_KEY,
  },
  region: "ap-shanghai",// ap 亚太
  profile: {
    httpProfile: {
      reqMethod: "POST",
      reqTimeout: 30, // 请求超时
    },
  },
});

async function run() {
  // base64 作为请求参数传递
  const audioBase64 = fs.readFileSync(AUDIO_FILE).toString("base64");

  const params = {
    EngSerViceType: "16k_zh", // 16k 采样率，中文识别
    SourceType: 1, // 语音数据来源，1：base64 编码的语音数据
    Data: audioBase64, // 语音数据，base64 编码后的字符串
    DataLen: Buffer.byteLength(audioBase64), // 获取 Buffer 实际字节长度
    VoiceFormat: "mp3",
  };

  try {
    const data = await client.SentenceRecognition(params);
    console.log("识别结果：", data.Result);
  } catch (err) {
    console.error("识别失败：", err);
  }
}

run();