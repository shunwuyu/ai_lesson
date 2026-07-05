"""
models.py — SQLAlchemy ORM 模型（数据库表定义）

注意：这些是数据库层的模型，包含 hashed_password 等内部字段。
永远不要直接把 ORM 模型返回给 API 客户端——用 schemas.py 转换。
"""

from datetime import datetime
# 字段类型 表关系 内部函数
from sqlalchemy import String, Integer, DateTime, ForeignKey, func
# Mapped 定义字段类型 mapped_column 定义字段属性 relationship 定义关联
from sqlalchemy.orm import Mapped, mapped_column, relationship
# Base 是数据库模型的基类，所有模型都必须继承自它
# Base提供了 ORM能力
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

    # 关联 posts 表的author 字段 
    # all, delete-orphan 表示删除用户时，也删除所有关联的帖子
    # Mapped[list["Post"]] 代表一个用户有多个文章 一对多的关系
    # posts 是 Python 的快捷方式，不是数据库的列
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
    # index = True 对"查某个用户的所有文章"这个查询有优化
    # -- 加了 index，这个查询走索引，速度快    
    # SELECT * FROM posts WHERE user_id = 1
    # -- 没有 index，全表扫描——遍历每一行看 user_id 是不是 1
    # 外键不会默认加索引
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)

    # 反向关系 从文章查它的作者
    # 这篇文章属于哪个用户"——post.author 直接拿到作者对象，不用自己写 SQL 查
    # User.posts和 Post.author 看的是同一条外键，一码事。
    author: Mapped["User"] = relationship(back_populates="posts")