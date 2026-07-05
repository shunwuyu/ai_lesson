"""
routers/users.py — 用户路由

端点只做三件事：
  1. 接收请求参数（通过 Depends(get_db) 拿到 Session）
  2. 调用 crud 函数处理数据
  3. 返回响应（response_model 自动转换为 Pydantic 格式）
"""
# 拆分路由的APIRouter
# Depends 就是帮你自动准备依赖的东西
# 在路由函数被调用前就运行了
# HTTPException FastAPI 内置的异常类，用来在路由中主动返回 HTTP 错误响应
# FastAPI 导出的 HTTP 状态码常量集合，让你写数字时不用记数字。

from fastapi import APIRouter, Depends, HTTPException, status
# Session 是 SQLAlchemy 的数据库会话对象
# 通过依赖注入来获取 Session 实例 事务句柄
from sqlalchemy.orm import Session
# 从数据库依赖中获取 Session 实例
from database import get_db
# schemas 负责定义请求和响应的模型
from schemas import UserCreate, UserUpdate, UserResponse
# crud 负责 数据库操作
import crud
# 客人点菜（请求） → 服务员接单（路由）
# 看菜单确定能点什么（schemas）
# 厨师按配方处理食材（models）
# 厨师实际操作（crud）
#  ← 成品装盘（schemas
#   过滤敏感信息后再返回）
#   ← 上菜给客人（路由返回响应）
# models  定义 数据库表长什么样（字段、类型、关联）
# schemas 定义 API 数据长什么样（请求格式、响应格式、校验规则）
# crud    定义 怎么操作数据库（查、增、改、删的具体逻辑）
# tags 用于在 Swagger 中分组路由
# prefix 路由前缀，/users 表示所有用户相关的路由都以 /users 开头
router = APIRouter(prefix="/users", tags=["用户管理"])

# response_model 这个接口返回的数据用 UserResponse 这个格式来包装
# 这个接口成功时返回 HTTP 状态码 201
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
# user_in 是请求体，db 是数据库会话，通过 Depends(get_db) 拿到 Session 实例
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """创建用户"""
    existing = crud.get_user_by_email(db, email=user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该邮箱已被注册",
        )
    return crud.create_user(db, user_in)


@router.get("/", response_model=list[UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """获取用户列表"""
    return crud.get_users(db, skip=skip, limit=limit)


@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    """获取单个用户"""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在",
        )
    return user


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_in: UserUpdate, db: Session = Depends(get_db)):
    """更新用户"""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return crud.update_user(db, user, user_in)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """删除用户"""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    crud.delete_user(db, user)