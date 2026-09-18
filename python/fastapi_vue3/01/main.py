from dotenv import load_dotenv
import os
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_openai import ChatOpenAI

# 加载环境变量
load_dotenv()

app = FastAPI(title="LangChain+DeepSeek Demo")

# 初始化DeepSeek LLM（兼容OpenAI SDK）
llm = ChatOpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url=os.getenv("DEEPSEEK_BASE_URL"),
    model=os.getenv("DEEPSEEK_MODEL"),
    temperature=0.7
)

# 请求体结构
class ChatReq(BaseModel):
    prompt: str

# hello对话接口
@app.post("/chat")
async def chat(req: ChatReq):
    resp = llm.invoke(req.prompt)
    return {
        "input": req.prompt,
        "reply": resp.content
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
