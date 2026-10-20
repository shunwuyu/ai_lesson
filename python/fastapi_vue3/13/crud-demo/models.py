"""models.py — SQLAlchemy ORM 模型"""
# 内置模块
from datetime import datetime
# 从 sqlalchemy 库导入 String, Integer, DateTime, ForeignKey, func，用来定义数据库字段。
from sqlalchemy import String, Integer, DateTime, ForeignKey, func
# 从 sqlalchemy.orm 库导入 Mapped, mapped_column, relationship，用来定义数据库模型和关联关系。
# Mapped 用来定义数据库字段的类型
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class User(Base):
    __tablename__ = "users"
  # 标记这个属性对应数据库里 int 类型的字段，给类型提示用
  # mapped_column 用来定义数据库字段的类型
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(200))  # ← 敏感字段
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )

    # 关联
    # 你对应的反向字段是 User 里的 posts；
    # ser 那边 `back_populates="posts"` = 告诉 User：反向字段是 Post 里的 author。
    posts: Mapped[list["Post"]] = relationship(
      # 增删改操作同步带到关联的子数据
      # `delete-orphan`：把子对象从父对象的列表移除时，直接删掉这条子数据
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