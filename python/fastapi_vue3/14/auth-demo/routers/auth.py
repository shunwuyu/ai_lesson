"""
认证相关路由：
- POST /register  注册
- POST /login     登录，返回 token
- GET  /me        当前用户信息（需 token）
"""
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import UserRegister, UserLogin
from security import hash_password, verify_password, create_token
from database import fake_users_db
from dependencies import get_current_user

router = APIRouter(tags=["auth"])


@router.post("/register", status_code=201)
def register(user: UserRegister):
    """注册：用户名 + 密码（密码强度由 pydantic 自动校验）"""
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="用户名已被注册")

    fake_users_db[user.username] = {
        "username": user.username,
        "hashed_password": hash_password(user.password),
    }
    print(fake_users_db)
    return {"message": "注册成功", "username": user.username}


@router.post("/login")
def login(user: UserLogin):
    """登录：校验用户名密码，成功返回 token"""
    db_user = fake_users_db.get(user.username)

    # 用户不存在 或 密码不对，统一返回同一句错误，
    # 避免泄露"用户名是否存在"这一信息
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="用户名或密码错误")

    return {
        "access_token": create_token(user.username),
        "token_type": "bearer",
    }


@router.get("/me")
def me(current_user: dict = Depends(get_current_user)):
    """受保护接口：必须带 Authorization: Bearer <token>"""
    return {
        "username": current_user["username"],
        "message": "这是需要登录才能看到的信息",
    }
