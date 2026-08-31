from fastapi import FastAPI
from app.api.v1.routes import health, quiz, report

app = FastAPI(title="AI 闯关学习 API", version="0.1.0")
app.include_router(health.router, prefix="/api/v1")
app.include_router(quiz.router, prefix="/api/v1")
app.include_router(report.router, prefix="/api/v1")
