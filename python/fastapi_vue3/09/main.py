from fastapi import FastAPI
# 拆分接口到不同文件，导入路由，实现代码解耦分层。
# 操作系统中文件夹即目录。Python 满足条件，目录就能成为可导入的包。
from routers.user import router as user_router
from routers.article import router as article_router

app = FastAPI()

app.include_router(user_router)
app.include_router(article_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
        
if __name__ == "__main__":
  import uvicorn
  uvicorn.run("main:app", host="127.0.0.1", port=8080, 
  reload=True)