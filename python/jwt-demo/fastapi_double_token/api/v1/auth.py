from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from schemas.user import UserRegister, UserLogin, TokenResponse, UserOut
from services.auth_service import AuthService
from utils.security import decode_token

router = APIRouter(prefix="/auth", tags=["认证模块"])

# OAuth2 方案，用来从header拿Bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# 鉴权依赖：拿到当前登录用户
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="access_token无效")
    user = AuthService.get_user_by_id(db, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户不存在或已禁用")
    return user

@router.post("/register", response_model=UserOut)
def register(data: UserRegister, db: Session = Depends(get_db)):
    return AuthService.register_user(db, data)

@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    return AuthService.login(db, data.username, data.password)

@router.post("/refresh", response_model=TokenResponse)
def refresh(refresh_token: str, db: Session = Depends(get_db)):
    return AuthService.refresh_token(db, refresh_token)

@router.post("/logout")
def logout(refresh_token: str, db: Session = Depends(get_db)):
    return AuthService.logout(db, refresh_token)

# 测试鉴权接口
@router.get("/me", response_model=UserOut)
def get_me(current_user: UserOut = Depends(get_current_user)):
    return current_user
