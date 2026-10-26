from pydantic import BaseModel
from datetime import datetime

# 注册
class UserRegister(BaseModel):
    username: str
    password: str

# 登录
class UserLogin(BaseModel):
    username: str
    password: str

# 返回token
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

# 用户简单信息
class UserOut(BaseModel):
    id: int
    username: str
    is_active: bool
    class Config:
        from_attributes = True
