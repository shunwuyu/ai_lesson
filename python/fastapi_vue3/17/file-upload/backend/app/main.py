from fastapi import FastAPI
# 跨域中间件
from fastapi.middleware.cors import CORSMiddleware
# `.` 代表**当前目录**，`.routers` 就是当前文件夹下名叫 `routers` 的模块，相对导入。
from .routers import upload

app = FastAPI()
# 核心是在返回响应时自动追加 CORS 相关响应头
# Access-Control-Allow-Origin
# Access-Control-Allow-Methods
# Access-Control-Allow-Headers
# 告诉浏览器允许前端域名跨域访问后端接口
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    # 允许跨域请求带上 Cookie、认证凭证
    allow_credentials=True,
    # 允许所有请求方法
    allow_methods=["*"],
    # 允许所有请求头
    allow_headers=["*"],
)

app.include_router(upload.router)