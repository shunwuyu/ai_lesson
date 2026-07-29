# 给Agent加上语音交互：ASR + 流式TTS

常用的Agent 都有语音功能。

语音输入会转成文字， 大模型的回答会通过语音朗读。可以切换音色。

STT(Speech To Text)语音转文字， TTS(Text To Speech)
文字转语音是Agent开发必备技术。

腾讯云的语音

- 领取资源包

  语音合成资源包
  语音识别资源包

- 创建apiKey
  头像右上角访问管理 
  apiKey secret 

https://cloud.tencent.com/document/product/1073/92668

这种直接传入全部文本生成语音的方式， 显然不太适合我们的场景。

豆包流式返回回答， 语音也是流式播放的。

改流式语音合成接口， 它是websocket的。

https://cloud.tencent.com/document/product/1073/108595


HTTP 是单向短连接，客户端主动请求、服务端响应后断开，无法主动推送消息。WebSocket 在 HTTP 握手后升级为持久双向长连接，双方可随时互发数据。HTTP 适合一次性请求；WebSocket 适合实时通讯，省去反复建立连接开销。