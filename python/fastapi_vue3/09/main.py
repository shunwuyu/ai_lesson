from fastapi import FastAPI
from routers.user import router as user_router
from routers.article import router as article_router

app = FastAPI()

app.include_router(user_router)
app.include_router(article_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
        