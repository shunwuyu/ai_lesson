from fastapi import FastAPI

app = FastAPI() # 初始化 FastAPI 应用
# Python 装饰器
# 设计模式 
# 人靠衣装马靠鞍
# 从普通函数变成路由函数
@app.get("/")
async def root():
  return {"message": "Hello World"} 

@app.get("/hello/{name}")
async def say_hello(name: str):
  return {"message": f"你好 {name}"}
