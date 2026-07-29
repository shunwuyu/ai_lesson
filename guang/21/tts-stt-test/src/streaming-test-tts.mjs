/**
 * 腾讯云流式 TTS（Text-to-Speech）WebSocket 客户端
 * ================================================
 * 功能：将多段中文文本通过腾讯云 WebSocket 接口实时合成为 MP3 音频文件。
 *
 * 工作原理：
 * 1. 构建带签名的 WebSocket 连接 URL（腾讯云 API v3 签名方式）
 * 2. 通过 WebSocket 连接到腾讯云 TTS 服务
 * 3. 等待服务端返回 ready 信号后，逐段发送文本
 * 4. 接收服务端返回的二进制音频数据（MP3 分片），实时写入本地文件
 * 5. 全部文本发送完毕后发送 ACTION_COMPLETE，等待服务端返回 final 信号后关闭连接
 *
 * 参考文档：腾讯云 流式语音合成 WebSocket 接口文档
 * API 域名：tts.cloud.tencent.com
 */

import "dotenv/config"; // 从 .env 文件加载环境变量
import WebSocket from "ws"; // Node.js WebSocket 客户端库
import crypto from "node:crypto"; // 用于生成 HMAC-SHA1 签名
import fs from "node:fs"; // 用于将音频数据写入本地文件

// -------- 腾讯云 API 鉴权配置 --------
// 通过环境变量注入，避免在代码中硬编码敏感信息
const SECRET_ID = process.env.SECRET_ID; // 腾讯云 API 密钥 ID
const SECRET_KEY = process.env.SECRET_KEY; // 腾讯云 API 密钥 Key
const APP_ID = process.env.APP_ID; // 腾讯云应用 ID

// -------- TTS 合成参数 --------
const VOICE_TYPE = 101001; // 音色 ID：101001 为智瑜（情感女声），支持中文及中英混合
const OUTPUT_FILE = "output3.mp3"; // 合成后音频保存路径

// -------- 流式发送控制 --------
const TEXT_INTERVAL_MS = 3000; // 每段文本之间的发送间隔（毫秒），模拟自然语速停顿

// 待合成的文本数组，每段独立发送，服务端每收到一段就开始合成
const TEXTS = [
  "傍晚我还在为晚霞开心，",
  "突然接到电话说系统崩了，",
  "我心里一沉冲回办公室，",
  "好在大家一起排查后终于恢复，",
  "我长长松了口气。",
];

/**
 * Promise 化的延时函数
 * @param {number} ms - 延时毫秒数
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 构建带腾讯云 API v3 签名的 WebSocket URL
 * ============================================
 * 签名流程（HMAC-SHA1 方式）：
 * 1. 收集所有请求参数，按 key 字母升序排列
 * 2. 拼接为 key=value&key=value 格式的参数字符串
 * 3. 在前面拼接 HTTP 方法 + 域名 + 接口路径，形成待签名字符串
 * 4. 使用 SECRET_KEY 对签名字符串做 HMAC-SHA1 加密，得到 Base64 签名
 * 5. 将签名作为 Signature 参数追加到 URL 中
 *
 * @returns {{ sessionId: string, url: string }} 包含会话 ID 和带签名的 WebSocket URL
 */
function buildWsUrl() {
  // 当前 Unix 时间戳（秒级）
  const now = Math.floor(Date.now() / 1000);

  // 生成唯一会话 ID，用于服务端标识本次合成会话
  // 格式：session_<时间戳>_<随机字符串>
  const sessionId = `session_${now}_${Math.random().toString(36).slice(2)}`;

  // 请求参数（签名前）
  const params = {
    Action: "TextToStreamAudioWSv2", // API 接口名称
    AppId: parseInt(APP_ID), // 应用 ID（需转为整数）
    Codec: "mp3", // 音频编码格式
    Expired: now + 3600, // 签名过期时间：当前时间 + 1 小时
    SampleRate: 16000, // 采样率：16000 Hz
    SecretId: SECRET_ID, // 密钥 ID（参与签名）
    SessionId: sessionId, // 会话 ID
    Speed: 0, // 语速：0 表示正常语速，范围 -2 到 2
    Timestamp: now, // 当前时间戳，用于防重放
    VoiceType: VOICE_TYPE, // 音色类型
    Volume: 5, // 音量：0-10，5 为正常音量
  };

  // 按 key 升序排列，生成待签名的参数字符串
  const sortedKeys = Object.keys(params).sort();
  const signStr = sortedKeys.map((k) => `${k}=${params[k]}`).join("&");

  // 完整签名字符串 = HTTP方法 + 域名 + 路径 + ? + 参数字符串
  const rawStr = `GETtts.cloud.tencent.com/stream_wsv2?${signStr}`;

  // 使用 HMAC-SHA1 生成签名
  const signature = crypto
    .createHmac("sha1", SECRET_KEY)
    .update(rawStr)
    .digest("base64");

  // 将签名合并到 URL 查询参数中
  const searchParams = new URLSearchParams({
    ...params,
    Signature: signature,
  });

  return {
    sessionId,
    // WebSocket 地址：wss 协议加密传输
    url: `wss://tts.cloud.tencent.com/stream_wsv2?${searchParams.toString()}`,
  };
}

/**
 * 通过 WebSocket 逐段发送待合成文本
 * ================================
 * 每条文本消息格式：
 * {
 *   session_id: string,       // 会话 ID，与建立连接时保持一致
 *   message_id: string,       // 消息 ID，用于追踪和调试
 *   action: "ACTION_SYNTHESIS", // 操作类型：合成
 *   data: string               // 待合成的文本内容
 * }
 *
 * 全部文本发送完毕后，发送 ACTION_COMPLETE 通知服务端输入已结束
 *
 * @param {WebSocket} ws - WebSocket 连接实例
 * @param {string} sessionId - 会话 ID
 */
async function sendTexts(ws, sessionId) {
  for (let i = 0; i < TEXTS.length; i++) {
    // 逐条发送文本合成请求
    ws.send(
      JSON.stringify({
        session_id: sessionId,
        message_id: `msg_${i}`,
        action: "ACTION_SYNTHESIS",
        data: TEXTS[i],
      })
    );
    console.log(`[文本] 已发送: ${TEXTS[i]}`);

    // 如果不是最后一条，等待间隔后再发送下一条
    if (i < TEXTS.length - 1) await sleep(TEXT_INTERVAL_MS);
  }

  // 通知服务端：所有文本已发送完毕，无更多输入
  ws.send(
    JSON.stringify({ session_id: sessionId, action: "ACTION_COMPLETE" })
  );
  console.log("[文本] 已发送 ACTION_COMPLETE");
}

/**
 * 主函数：流式 TTS 合成
 * =====================
 * 完整流程：
 * 1. 校验环境变量
 * 2. 构建签名 URL 并建立 WebSocket 连接
 * 3. 创建本地文件写入流，准备接收音频数据
 * 4. 监听 WebSocket 事件：
 *    - open: 连接建立成功
 *    - message: 处理服务端消息（区分二进制音频数据 和 JSON 控制消息）
 *    - error: 连接异常
 *    - close: 连接关闭
 *
 * 消息处理逻辑：
 * - 二进制消息（isBinary=true）：音频分片数据，直接写入文件
 * - JSON 文本消息分三种情况：
 *   ① ready=1：服务端准备就绪，开始发送文本
 *   ② code !== 0：合成错误，打印错误信息并关闭
 *   ③ final=1：所有文本合成完毕，关闭连接
 */
function streamTTS() {
  // 校验必须的环境变量
  if (!SECRET_ID || !SECRET_KEY || !APP_ID) {
    throw new Error("请先在 .env 配置 SECRET_ID、SECRET_KEY、APP_ID");
  }

  // 获取签名 URL 和会话 ID
  const { url, sessionId } = buildWsUrl();

  // 建立 WebSocket 连接
  const ws = new WebSocket(url);

  // 创建文件写入流，flags: "w" 表示覆盖写入
  const writeStream = fs.createWriteStream(OUTPUT_FILE, { flags: "w" });

  let totalBytes = 0; // 统计已接收的音频数据总字节数
  let closed = false; // 防止重复关闭的标记
  let sent = false; // 标记是否已开始发送文本，避免重复发送

  /**
   * 安全关闭资源（防重复）
   * 被 message/final、error、close 事件共用，确保仅执行一次清理
   */
  const closeAll = () => {
    if (closed) return;
    closed = true;

    // 关闭文件写入流，完成后打印统计信息
    writeStream.end(() => {
      console.log(`[保存] 音频已保存至 ${OUTPUT_FILE}，共 ${totalBytes} 字节`);
    });

    // 如果 WebSocket 尚未进入关闭流程，主动关闭
    // readyState < CLOSING 表示连接仍处于 OPEN 或 CONNECTING 状态
    if (ws.readyState < WebSocket.CLOSING) ws.close();
  };

  // -------- WebSocket 事件监听 --------

  // 连接建立：此时还不能发文本，需等服务端返回 ready 信号
  ws.on("open", () => {
    console.log("[连接] WebSocket 已建立，等待服务端就绪...");
  });

  /**
   * 接收服务端消息
   * @param {Buffer|ArrayBuffer|Buffer[]} data - 消息数据
   * @param {boolean} isBinary - 是否为二进制数据
   *
   * 二进制数据 = 音频分片（MP3 PCM 帧），直接写入文件
   * 文本数据 = JSON 控制消息，包含 ready/final/error 等状态
   */
  ws.on("message", async (data, isBinary) => {
    // 二进制消息：音频数据分片，直接写入文件
    if (isBinary) {
      writeStream.write(data);
      totalBytes += data.length;
      return;
    }

    // 文本消息：JSON 控制协议
    try {
      const msg = JSON.parse(data.toString());
      console.log("[消息]", JSON.stringify(msg));

      // 服务端返回 ready=1，表示可以开始发送文本
      if (msg.ready === 1 && !sent) {
        sent = true;
        await sendTexts(ws, sessionId);
      }

      // code 存在且非 0 表示合成出错
      if (msg.code && msg.code !== 0) {
        console.error(`[错误] code=${msg.code}, message=${msg.message}`);
        closeAll();
      }
      // final=1 表示本次合成全部完成
      else if (msg.final === 1) {
        console.log("[完成] 合成结束。");
        closeAll();
      }
    } catch (e) {
      console.error("[解析错误]", e.message);
    }
  });

  // 连接错误：打印错误信息并清理
  ws.on("error", (err) => {
    console.error("[WebSocket 错误]", err.message);
    closeAll();
  });

  // 连接关闭：服务端主动关闭或网络断开时触发
  ws.on("close", (code, reason) => {
    console.log(`[断开] 连接已关闭，code=${code}, reason=${reason}`);
    closeAll();
  });
}

// 启动流式 TTS 合成
streamTTS();
