"""
FastAPI 依赖：从 Authorization 头解析当前用户
所有受保护接口都 Depends(get_current_user)
"""
from fastapi import Depends, HTTPException, status
# HTTPBearer 负责从请求头里提取 Authorization: Bearer xxx 里的 token，
# HTTPAuthorizationCredentials 
# 是它解析后拿到的凭证对象，credentials.credentials 就是 token 字符串。
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from security import parse_token
from database import fake_users_db

# HTTPBearer 自动从请求头读取：Authorization: Bearer <token>
security = HTTPBearer()

# 请求进来时，FastAPI 会自动从 Authorization: Bearer xxx 头里解析出 token，
# 然后把这个函数返回的 dict（当前用户信息）注入给受保护的接口使用。
# Depends(security)：告诉 FastAPI 这个参数不要从前端传，而是先执行 security（
# 即 HTTPBearer()）去解析请求头，把结果赋给 credentials
# HTTPAuthorizationCredentials 是token 字符串
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    流程：
    1. HTTPBearer 取出 Bearer 后面的 token
    2. parse_token 解出 username（内部用 compare_digest 防时序攻击）
    3. 返回用户 dict
    """
    username = parse_token(credentials.credentials)
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="无效或过期的 token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return fake_users_db[username]
