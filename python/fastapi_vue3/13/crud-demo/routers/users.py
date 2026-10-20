from fastapi import APIRouter, Depends, HTTPException, status
from schemas import UserCreate, UserResponse, UserUpdate
from database import get_db
from sqlalchemy.orm import Session
from models import User
import crud

router = APIRouter(prefix="/users", tags=["用户管理"])
# Depends 用来依赖注入数据库会话，确保每个请求都有一个独立的数据库会话。
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """创建用户"""
    existing = crud.get_user_by_email(db, email=user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该邮箱已被注册",
        )
    return crud.create_user(db, user_in)

# skip 会自动从请求参数中获取，默认值为 0
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
    print(f"delete_user: user_id={user_id}, user={user}")
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    crud.delete_user(db, user)
