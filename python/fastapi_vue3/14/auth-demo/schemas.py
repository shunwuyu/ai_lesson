"""
Pydantic 请求体模型
- 负责校验入参格式
- 密码强度规则集中在这里
"""
# 导入正则表达式模块
import re
# 导入 Pydantic 模型基类和字段校验器
# field_validator 数据进模型前自动跑一遍校验，不通过直接报错，通过才放行，专门用来卡格式规则
from pydantic import BaseModel, field_validator

class UserRegister(BaseModel):
    """注册请求：用户名 + 密码"""
    username: str
    password: str
    # 装饰器：指定校验密码字段
    @field_validator("password")
    # Python 语言内置的装饰器 把方法变成类方法
    # Pydantic 的 field_validator 要求验证方法必须是类方法，所以要加 @classmethod
    # 类方法：校验密码强度
    # v 是传进来的密码值，cls 是模型类本身
    @classmethod
    def check_password_strength(cls, v: str) -> str:
        """密码必须 ≥8 位，且同时包含字母和数字"""
        if len(v) < 8:
          # 它是Python内置异常，表示值不符合预期。
            raise ValueError("密码长度至少 8 位")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("密码必须包含字母")
        if not re.search(r"\d", v):
            raise ValueError("密码必须包含数字")
        return v

class UserLogin(BaseModel):
    """登录请求：用户名 + 密码"""
    username: str
    password: str