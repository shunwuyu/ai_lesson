from sqlalchemy.orm import Session
from datetime import datetime
from models.user import User, RefreshToken
from schemas.user import UserRegister
from utils.security import get_password_hash, verify_password, create_access_token, create_refresh_token, decode_token
from fastapi import HTTPException, status

class AuthService:
    @staticmethod
    def register_user(db: Session, data: UserRegister) -> User:
        # 判断用户名是否存在
        exist_user = db.query(User).filter(User.username == data.username).first()
        if exist_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="用户名已存在")
        hashed_pwd = get_password_hash(data.password)
        new_user = User(username=data.username, hashed_password=hashed_pwd)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    @staticmethod
    def login(db: Session, username: str, password: str) -> dict:
        user = db.query(User).filter(User.username == username).first()
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="账号或密码错误")
        if not user.is_active:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="账号已禁用")

        access_token = create_access_token(user.id)
        refresh_token_str = create_refresh_token(user.id)

        # 存入数据库
        rt = RefreshToken(
            token=refresh_token_str,
            user_id=user.id,
            expires_at=RefreshToken.get_expire_time()
        )
        db.add(rt)
        db.commit()
        return {"access_token": access_token, "refresh_token": refresh_token_str, "token_type": "bearer"}

    @staticmethod
    def refresh_token(db: Session, refresh_token: str) -> dict:
        # 1. 先解析jwt拿到用户id
        user_id = decode_token(refresh_token)
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="刷新令牌无效")
        # 2. 查数据库记录，必须存在、未吊销、未过期
        rt_record = db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token,
            RefreshToken.user_id == user_id,
            RefreshToken.is_revoked == False,
            RefreshToken.expires_at > datetime.utcnow()
        ).first()
        if not rt_record:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="刷新令牌已失效，请重新登录")

        # ✅ 滚动刷新：旧refresh token作废，生成新refresh token
        rt_record.is_revoked = True
        new_access = create_access_token(user_id)
        new_refresh = create_refresh_token(user_id)
        new_rt = RefreshToken(
            token=new_refresh,
            user_id=user_id,
            expires_at=RefreshToken.get_expire_time()
        )
        db.add(new_rt)
        db.commit()
        return {"access_token": new_access, "refresh_token": new_refresh, "token_type": "bearer"}

    @staticmethod
    def logout(db: Session, refresh_token: str):
        rt = db.query(RefreshToken).filter(RefreshToken.token == refresh_token).first()
        if rt:
            rt.is_revoked = True
            db.commit()
        return {"msg": "登出成功"}

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()
