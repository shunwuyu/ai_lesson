from typing import Union # 并集类型
from fastapi import FastAPI

app = FastAPI() # 初始化 FastAPI 应用

@app.get("/")
async def root():
  return {"message": "Hello World"} 

@app.get("/hello/{name}")
async def say_hello(name: str):
  return {"message": f"你好 {name}"}
