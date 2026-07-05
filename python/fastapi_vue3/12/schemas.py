"""
Pydantic 是一个 Python 数据校验库，你定义好数据结构（类型  
  规则），它自动帮你验证输入数据是否合法并转换成 Python      
  对象。
schemas.py — Pydantic 模型：定义 API 的请求体和响应体

核心原则：数据库模型（models.py） ≠ API 模型（schemas.py）
  - UserResponse 绝不包含 hashed_password
  - UserCreate 的 password 是明文输入，存入数据库前要哈希
  - ConfigDict(from_attributes=True) 让 Pydantic 能从 ORM 对象自动转换
"""

from datetime import datetime
# ConfigDict 一些额外的配置选项
from pydantic import BaseModel, EmailStr, Field, ConfigDict


# ═══════════════════════════════════════════
# User 相关
# ═══════════════════════════════════════════

class UserCreate(BaseModel):
    """创建用户时的请求体"""
    username: str = Field(min_length=3, max_length=50, examples=["zhangsan"])
    email: EmailStr = Field(examples=["zhang@example.com"])
    password: str = Field(min_length=8, max_length=100)


class UserUpdate(BaseModel):
    """更新用户时的请求体（所有字段可选）"""
    username: str | None = Field(default=None, min_length=3, max_length=50)
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8, max_length=100)
    is_active: bool | None = None


class UserResponse(BaseModel):
    """返回给客户端的用户数据——绝不包含密码！"""
    model_config = ConfigDict(from_attributes=True)  # ← 关键：允许从 ORM 对象转换

    id: int
    username: str
    email: str
    is_active: bool
    created_at: datetime


# ═══════════════════════════════════════════
# Post 相关
# ═══════════════════════════════════════════

class PostCreate(BaseModel):
    """创建文章时的请求体"""
    title: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1, max_length=5000)
    published: bool = False


class PostUpdate(BaseModel):
    """更新文章时的请求体（所有字段可选）"""
    title: str | None = Field(default=None, min_length=1, max_length=200)
    content: str | None = Field(default=None, min_length=1, max_length=5000)
    published: bool | None = None


class PostResponse(BaseModel):
    """返回的文章数据"""
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    published: bool
    created_at: datetime
    updated_at: datetime
    user_id: int


class PostWithAuthor(BaseModel):
    """文章 + 作者信息（用于列表展示）"""
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    published: bool
    created_at: datetime
    author: UserResponse  # 嵌套另一个 Pydantic 模型