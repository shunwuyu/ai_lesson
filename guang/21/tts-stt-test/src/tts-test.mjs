import "dotenv/config";
import tencentcloud from "tencentcloud-sdk-nodejs-tts";
import fs from "node:fs";

const secretId = process.env.SECRET_ID;
const secretKey = process.env.SECRET_KEY;

const TtsClient = tencentcloud.tts.v20190823.Client;

const client = new TtsClient({
credential: {
    secretId,
    secretKey,
  },
region: "ap-beijing",
profile: {
  httpProfile: {
    endpoint: "tts.tencentcloudapi.com",
  },
},
});


const params = {
  Text: "下班路上，我还在为晚霞开心。突然电话响起：系统崩了。我的心一下揪紧，冲进办公室时几乎要绝望。可当大家一起排查、重启， 屏幕终于恢复正常，我长长松了口气，笑着说：还好，我们没放弃。",
  SessionId: "session-001",
  VoiceType: 502006,           // 101007: 智瑜 (女声)
  Codec: "mp3",                // 指定输出格式为 mp3
};

client.TextToVoice(params).then(
  (data) => {
    // 返回的 Audio 字段是 Base64 编码的音频数据
    const audioBuffer = Buffer.from(data.Audio, "base64");
    const outputPath = "./output.mp3";

    fs.writeFile(outputPath, audioBuffer, (err) => {
      if (err) {
        console.error("保存文件失败: ", err);
      } else {
              console.log("MP3 已保存至: ", outputPath);
      }
    });
  },
  (err) => {
    console.error("合成失败: ", err);
  }
);