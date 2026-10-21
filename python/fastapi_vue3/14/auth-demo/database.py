"""
模拟"数据库"：内存 dict 代替真实 DB
真实项目里这里换成 SQLAlchemy / MongoDB 等
"""

# username -> {"username": ..., "hashed_password": ...}
# ⚠️ 只存哈希后的密码，绝不存明文
# 它俩本质都是键值对，但 dict 是 Python 里的数据结构，JSON 是跨语言的文本格式。另外 
# JSON 的键只能是字符串，语法也更严，不像 dict 那么灵活。
fake_users_db: dict[str, dict] = {}
