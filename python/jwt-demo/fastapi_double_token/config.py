#  Pydantic 的配置基类，用来自动从环境变量和 .env 文件读取并校验项目配置。
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # PostgreSQL
    DATABASE_URL: str = "postgresql://user:123456@localhost:5432/pg_auth"
    # JWT 密钥，生产务必改成复杂随机字符串！
    SECRET_KEY: str = "your-super-secret-key-change-in-prod-xxxxxx"
    ALGORITHM: str = "HS256"
    # 过期时间
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

# 实例化配置对象
settings = Settings()
