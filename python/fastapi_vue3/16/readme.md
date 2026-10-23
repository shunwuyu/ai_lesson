# WebSocket

> HTTP 是"你问我才答"——WebSocket 是"打开一条线，双方随时说"——从实时聊天到股价推送，掌握长连接通信（握手成功后**这条连接一直保持**）。

## 1. 为什么需要 WebSocket？

HTTP 的困境

```
没有websocket, 基于http 能不能实现实时聊天？

HTTP（请求-响应模式）：
  客户端: 有新消息吗？  →  服务端: 没有
  客户端: 有新消息吗？  →  服务端: 没有
  客户端: 有新消息吗？  →  服务端: 有了！给你。
  客户端: 有新消息吗？  →  服务端: 没有
  ...

问题：
  - 大量无效请求（99% 的轮询都是白问）
  - 延迟高（两条消息之间至少隔一个轮询间隔）
  - 浪费带宽（每个请求都带完整 HTTP 头）


```

### WebSocket 的解决

```
WebSocket（持久连接）：
  客户端 → 服务端: 我们建立 WebSocket 连接！
  服务端 → 客户端: 好的，连接已建立
  ── 连接保持 ──
  服务端 → 客户端: 新消息来了！
  客户端 → 服务端: 我发了一条消息
  服务端 → 客户端: 又一个新消息！
  ...

优势：
  - 服务器可以主动推送（不需要客户端轮询）
  - 延迟极低（毫秒级）
  - 连接建立后只有数据帧（无 HTTP 头开销）
```

	HTTP	WebSocket
通信方向	客户端请求 → 服务端响应	双向（全双工）
连接	每次请求建立新连接（或 Keep-Alive 复用）	一次握手，持久连接
谁主动	只有客户端能发起	客户端和服务器都能主动发
适用	REST API、页面浏览、文件下载	聊天、通知、实时数据、协作编辑
协议	HTTP/1.1, HTTP/2	ws:// 或 wss://（升级自 HTTP）

HTTP 1.0 支持Keep-Alive 是 HTTP 持久连接，复用同一条 TCP 连接处理多个请求，
连接空闲一段时间后才断开，**仍然只能客户端主动发起请求**。

## 2. WebSocket 连接建立过程

客户端                        服务端
  │                             │
  │  GET /chat                  │
  │  Upgrade: websocket         │  ← 这是普通 HTTP 请求，但要求"升级"
  │  Connection: Upgrade         │
  │  Sec-WebSocket-Key: xxx     │
  │─────────────────────────────>│
  │                             │
  │  HTTP/1.1 101 Switching     │  ← 服务器同意升级
  │  Upgrade: websocket          │
  │<─────────────────────────────│
  │                             │
  │  ← 现在走 WebSocket 协议了 → │  ← 此后不再是 HTTP！
  │                             │

关键：WebSocket 通过一条 HTTP 请求"升级"而来，之后就不再是 HTTP 了。

## 3. FastAPI 的 WebSocket 路由
### 3.1 最简单的 WebSocket 端点

## 4. 连接管理与心跳检测
### 4.1 处理连接断开

## 4.2 心跳检测（Ping/Pong）

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # 每 30 秒发送一个 ping，确认连接还活着
            await asyncio.sleep(30)
            try:
                await websocket.send_json({"type": "ping"})
            except WebSocketDisconnect:
                break
    except WebSocketDisconnect:
        print("心跳检测到客户端已断开")



- 为什么要做心跳链接？
长连接本身占资源，但**最麻烦的是悄无声息断网（拔网线、切 4G），
客户端没发关闭信号，服务端傻傻保留假连接，一直占着内存和连接名额**。
心跳就是用来清这种僵尸连接的。
注释前端 发送pong 