import "dotenv/config";
// 引入腾讯云 TTS SDK
import tencentcloud from "tencentcloud-sdk-nodejs-tts";
import fs from "node:fs";

const secretId = process.env.SECRET_ID;
const secretKey = process.env.SECRET_KEY;
// 腾讯云 SDK 的顶层模块对象
// TTS 产品模块，语音合成服务
// API 版本号
const TtsClient = tencentcloud.tts.v20190823.Client;

const client = new TtsClient({
  credential: {
    secretId,
    secretKey,
  },
  region: "ap-beijing",
  profile: {
    // `httpProfile` 是**HTTP 请求配置对象**，用来控制 SDK 底层发网络请求时的 HTTP 参数
    httpProfile: {
      endpoint: "tts.tencentcloudapi.com",
    },
  },
});

const params = {
  Text: "下班路上，我还在为晚霞开心。突然电话响起：系统崩了。我的心一下揪紧，冲进办公室时几乎要绝望。可当大家一起排查、重启，屏幕终于恢复正常，我长长松了口气，笑着说：还好，我们没放弃。",  // 要合成的文本
  SessionId: "session-001",
  VoiceType: 502006,               // 101007：智瑜（女声）
  Codec: "mp3",                    // 指定输出格式为 mp3
};
// 调用 TTS 接口
client.TextToVoice(params)
  .then(
  (data) => {
    console.log(data.Audio);
    // 接口返回 `Audio: "base64字符串"`（不是 AudioData）
    // 转成 Buffer 对象
    // Buffer 就是 Node 里装原始二进制字节的内存盒子，图片、音频这类机器数据就放这里。
    // buffer 可以直接写入文件，
    // console.log(data.Audio);
    const audioBuffer = Buffer.from(data.Audio, "base64");
    const outputPath = "./output2.mp3";

    fs.writeFile(outputPath, audioBuffer, (err) => {
      if (err) {
        console.error("保存文件失败：", err);
      } else {
        console.log("MP3 已保存至：", outputPath);
      }
    });
  },
  (err) => {
    console.error("合成失败：", err);
  }
);