# fastapi crud

- 建立目录

 这是一个典型的FastAPI 项目目录结构

 crud：CRUD 操作函数（增删改查的业务逻辑）。相当于nestjs 的service层。
 database：引擎、会话工厂、Base、get_db 依赖。
 models：SQLAlchemy ORM 模型。
 routers：路由模块（按资源拆分）
  __init__.py：路由模块的入口文件，用于注册路由。
  users.py 
  posts.py
 schemas：存放 Pydantic 模型（python zod），用于定义接口请求的数据校验、响应数据的序列化格式。
 main.py：FastAPI 应用入口 + 路由注册

- 安装依赖

```bash
pip install fastapi sqlalchemy pydantic
# sqlalchemy ORM 工具
# pydantic Python 数据校验库

# 如何看包安装到哪里去了
python -m site
找 `site-packages` 那几行

```

```
from fastapi import FastAPI

app = FastAPI(
  title="Blog API",
  description="FastAPI + SQLAlchemy 博客系统",
  version="1.0.0",
)

@app.get("/")
def root():
    return {"message": "Blog API", "docs": "/docs"}
```

uvicorn main:app --reload 启动 
uvicorn ASGI（Asynchronous Server Gateway Interface） 服务器，负责把你的 FastAPI 应用跑起来。 


```
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session

DATABASE_URL = "sqlite:///./blog.db"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```
安装插件 SQLite Viewer

```
"""models.py — SQLAlchemy ORM 模型"""
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(200))  # ← 敏感字段
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )

    # 关联
    posts: Mapped[list["Post"]] = relationship(
        back_populates="author", cascade="all, delete-orphan"
    )


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200))
    content: Mapped[str] = mapped_column(String(5000))
    published: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    # 外键
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)

    # 反向关系
    author: Mapped["User"] = relationship(back_populates="posts")
```