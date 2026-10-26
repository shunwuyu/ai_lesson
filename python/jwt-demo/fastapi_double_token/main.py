from fastapi import FastAPI
from database import Base, engine
from models.user import User, RefreshToken 
from api.v1.auth import router as auth_router

Base.metadata.create_all(bind=engine)
app = FastAPI(title="FastAPI 双Token认证示例")

@app.get("/")
def read_root():
  return {"Hello": "World"}

app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)