"""
安全相关工具：
- bcrypt 密码哈希 / 验证
- 简易 token 生成 / 解析（base64(username:timestamp)）
- secrets.compare_digest 常量时间比较，防时序攻击
"""
import base64
#  Python 内置的安全随机数模块，专门用来生成不可预测的 token、密码、密钥等敏感数据。
import secrets
import time
from typing import Optional
# 导入 passlib 库的密码上下文管理器
# 它负责管理密码的哈希和验证，确保密码在存储时是安全的
from passlib.context import CryptContext

from database import fake_users_db

# bcrypt 哈希上下文：schemes 指定算法，deprecated="auto" 旧算法自动标记废弃
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ── 密码哈希 ──────────────────────────────────
def hash_password(plain: str) -> str:
    """注册时调用：把明文密码哈希后存库"""
    return pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    """登录时调用：比对明文和哈希（bcrypt 内部已是常量时间比较）"""
    return pwd_context.verify(plain, hashed)


# # ── 简易 token（练习用，注意安全问题见 main 末尾说明）──
def create_token(username: str) -> str:
    """生成 token：base64(username:timestamp)"""
    raw = f"{username}:{int(time.time())}"
    return base64.b64encode(raw.encode()).decode()

# Optional[str] 表示返回值可能是是 str 也可能是 None
# 这里用 None 表示解析失败
def parse_token(token: str) -> Optional[str]:
    """
    解析 token，返回 username；失败返回 None。
    比对用户名时用 secrets.compare_digest：
    普通 == 比较遇到第一个不同字符就返回，攻击者可通过响应时间差异
    一点点猜中有效用户名；compare_digest 恒定时间跑完整个字符串。
    """
    try:
        # 解码 base64 字符串，得到 username:timestamp
        raw = base64.b64decode(token).decode()
        # 解析出 username 和 timestamp
        username, _ts = raw.split(":", 1)
    except Exception:
        return None

    # 常量时间比对，在模拟库里找匹配的用户名
#     想象你在玩"猜密码"游戏，每次猜一个字符，系统会告诉你"对了"还是"错了"。
# 普通 == 就像这样：
# 系统从第一个字符开始比，一旦发现不对，立刻喊停说"错了"。
# 攻击者发现：猜 a 时系统0.001秒就返回，猜 b 时也是0.001秒——说明第一个字符都不对。
# 但猜 t 时花了0.002秒才返回，说明第一个字符对了，系统多花了一点时间去比第二个字符。
# 就这样，攻击者一个字符一个字符地试，靠响应时间的微小差异，最终把整个用户名拼出来。
# compare_digest 就像这样：
# 不管你对不对，系统都坚持把所有字符比完才告诉你结果。每次耗时完全一样，攻击者拿不到任何线索，猜不了。
# 简单说：普通 == 会"泄密"（通过快慢暴露猜对了几位），compare_digest 守口如瓶。

    for stored_username in fake_users_db:
        # 比对用户名时用 secrets.compare_digest：
        # 普通 == 比较遇到第一个不同字符就返回，攻击者可通过响应时间差异
        # 一点点猜中有效用户名；compare_digest 恒定时间跑完整个字符串。
        if secrets.compare_digest(stored_username, username):
            return stored_username
    return None
