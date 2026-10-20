# 从 fastapi 库导入 FastAPI 类，用来创建 Web 应用实例。
from fastapi import FastAPI
# 从 database 模块导入 engine 和 Base，用来创建数据库引擎和定义数据库模型。
from database import engine, Base
# Python 调用类名就自动调用__init__，不用写 new，语法简化了。
import models
# 建表
Base.metadata.create_all(bind=engine)
from routers import users, posts

app = FastAPI(
  title="Blog API",
  description="FastAPI + SQLAlchemy 博客系统",
  version="1.0.0",
)

app.include_router(users.router)
app.include_router(posts.router)

# 定义根路由，返回一个 JSON 字典串。
@app.get("/")
def root():
    return {"message": "Blog API", "docs": "/docs"}