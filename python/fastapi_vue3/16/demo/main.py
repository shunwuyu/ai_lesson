from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# 静态资源服务
from fastapi.staticfiles import StaticFiles
# 自带异步库
import asyncio
# Python 自带的 json 标准库，用来实现 JSON 字符串和 Python 对象互相转换
import json

app = FastAPI(title="FastAPI + WebSocket Demo")

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     # ① 首先必须"接受"连接
#     await websocket.accept()

#     # ② 收发消息
#     # while True:
#     #     data = await websocket.receive_text()      # 接收
#     #     # data = await websocket.receive_bytes()        # 接收二进制
#     #     # json = await websocket.receive_json()         # 接收 JSON
#     #     print(f"收到: {data}")
#     #     await websocket.send_text(f"你说: {data}")  # 回复（回声）
#     #     # await websocket.send_bytes(b"\x00\x01")       # 发送二进制
#     #     # await websocket.send_json({"msg": text})       # 发送 JSON

#     try:
#         while True:
#             data = await websocket.receive_text()
#             await websocket.send_text(f"收到: {data}")
#     # 关闭页面
#     except WebSocketDisconnect:
#         # 客户端断开连接（关闭标签页、网络断开等）
#         print("客户端已断开")
#     except Exception as e:
#         # 其他异常
#         print(f"连接异常: {e}")
# 心跳检测
# 长连接本身占资源，但**最麻烦的是悄无声息断网（拔网线、切 4G），
# 客户端没发关闭信号，服务端傻傻保留假连接，一直占着内存和连接名额**。
# 心跳就是用来清这种僵尸连接的。
PING_INTERVAL = 30        # 每 30 秒发一次 ping
PONG_TIMEOUT = 10         # 等 pong 最多 10 秒，超时就判定死连接

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # ① 首先必须"接受"连接
    await websocket.accept()
    # 拿到 asyncio 事件循环内部的时间戳，单位秒，用来做异步里的超时计时
    # `time.time()` 拿到的是系统时钟，用户或者 NTP 同步时**时间可以往回调**。
    # `asyncio.get_running_loop().time()` 是**单调时钟**：只会一直变大，
    # 不会回退，不管系统时间怎么改，算时间差永远靠谱，就是用来做超时、心跳、定时器的。
    last_pong_time = asyncio.get_event_loop().time()
    print(last_pong_time)
    async def send_ping_loop():
        """后台任务：定时发 ping，并检查 pong 是否超时"""
        # 这个变量不是在当前函数里面定义的，去外层嵌套
        # 函数里找，并且允许修改它。
        nonlocal last_pong_time
        while True:
            await asyncio.sleep(PING_INTERVAL)
            # 超时判断放在后台任务里：客户端不发数据也能检测到僵尸连接
            now = asyncio.get_event_loop().time()
            if now - last_pong_time > PING_INTERVAL + PONG_TIMEOUT:
                print("pong 超时，判定死连接，主动关闭")
                try:
                    # 关闭后主循环的 receive_text() 会抛异常，随之退出
                    await websocket.close()
                except Exception:
                    pass
                break
            try:
                await websocket.send_json({"type": "ping"})
            except Exception:
                break

    # 启动后台 ping 任务
    # 在事件循环里新建一个协程任务并发跑。
    ping_task = asyncio.create_task(send_ping_loop())

    try:
        while True:
            raw = await websocket.receive_text()

            # 容错：客户端可能发非 JSON 的纯文本，解析失败就按普通文本回声
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                print("收到非 JSON 文本:", raw)
                await websocket.send_json({"type": "msg", "msg": f"你说: {raw}"})
                continue

            # 客户端回的 pong，更新最后活跃时间
            if data.get("type") == "pong":
                last_pong_time = asyncio.get_event_loop().time()
                print("收到 pong，连接存活")
                continue

            # 普通业务消息
            if data.get("type") == "msg":
                msg = data.get("msg", "")
                print("收到业务消息:", msg)
                await websocket.send_json({"type": "msg", "msg": f"你说: {msg}"})

    except WebSocketDisconnect:
        print("客户端主动断开")
    except Exception as e:
        print("连接异常:", e)
    finally:
        ping_task.cancel()
        try:
            await websocket.close()
        except Exception:
            pass
# 挂载静态目录到根路径，html=True 让 / 自动返回 static/index.html
# 注意：必须放在所有路由之后，否则会拦截 /ws 等请求
app.mount("/", StaticFiles(directory="static", html=True), name="static")