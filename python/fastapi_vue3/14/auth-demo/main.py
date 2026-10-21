"""
FastAPI 入口
职责只有一个：创建 app，挂路由。
业务逻辑全在 routers/、security.py、dependencies.py 等模块里。
"""
from fastapi import FastAPI

from routers.auth import router as auth_router

app = FastAPI(title="认证练习 Demo")

# 挂载路由
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "欢迎，打开 /docs 调试接口"}
