# 给Agent 加上语音交互： ASR + 流式 TTS

我们常用的Agent 都有语音功能

语音输入会转成文字，大模型的回答会通过语音朗读。可以切换音色。

这种 STT（Speech To Text）语音转文字，TTS（Text To Speech）文字转语音基本是 Agent 开发必备技术了。

这节我们就来学一下语音相关技术，实现豆包同款功能。

创建项目：

https://console.cloud.tencent.com/tts
腾讯云

语言合成资料包
已领取基础/精品音色免费资源包
语音识别资料包

访问管理->访问密钥->API密钥管理
SecretId 

音色列表
https://cloud.tencent.com/document/product/1073/92668

流式语音合成接口， 它是websocket 的
https://cloud.tencent.com/document/product/1073/108595


- HTTP = 点一份套餐，厨房全做完才端上来，你只能干等。
- WebSocket = 自助餐传菜口，厨师做好一盘就推出来一盘，你随时还能喊「再来一道」。

所以这里需要 WebSocket，是因为场景是 流式（streaming） ：文字是陆续产生的、音频也要边合成边播放，中间还多次双向交互，HTTP 的「一问一答、一次给全」满足不了。

如果只是想合成一段固定文本，用普通 HTTP 接口就够，不需要 WebSocket。

头像 账号信息 


这样，我们就可以来实现豆包同款的语音交互了：

点击录音，输入一段语音，服务端提供接口来转文字，之后用大模型生成回答。

流式 SSE 返回文字，同时用 WebSocket 返回流式语音。

这样就可以实现语音输入，流式的文字、语音输出。

为啥不直接用 SSE 返回音频数据呢？

因为 SSE 是基于 http 的文本协议，需要转 Base64 才行，传这种二进制数据还是 WebSocket 更合适。

思路理清了，接下来按照这个实现下豆包同款交互：

先创建后端项目：