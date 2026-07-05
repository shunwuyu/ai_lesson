"""database.py — 引擎、会话工厂、Base、get_db 依赖"""
# 引入 SQLAlchemy 相关模块
# create_engine 创建数据库引擎
# DeclarativeBase 声明式基类，用于创建 ORM 模型
# sessionmaker 会话工厂，用于创建数据库会话
# Session 数据库会话对象
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session

# 数据库 URL（生产环境从环境变量读取）
DATABASE_URL = "sqlite:///./app.db"

# 引擎（整个应用只创建一次）
engine = create_engine(
    DATABASE_URL,
    echo=True,              # 开发环境打印 SQL
    pool_size=5,            # 连接池大小 
    # 银行柜台比喻
    # 连接池常驻 5 个数据库连接，请求来时优先复用已有连接，不用频繁新建销毁连接，提升访问速度。
    # 没有连接池：每个人办事都临时新开一个窗口，办完立刻拆掉，开 / 关窗口巨耗时，人一多直接堵死。
    # pool_size=5：长期固定开放 5 个窗口（常驻连接），来人直接用现成窗口，不用反复搭建拆除。
    # max_overflow：高峰期临时最多再加 10 个临时窗口，高峰过后自动收回，不会无限占用资源。
    max_overflow=10,        # 最大溢出连接数
)

# Session 工厂
# SessionLocal 是一个类，你可以实例化它来创建 Session 实例。
SessionLocal = sessionmaker(
  bind=engine,
  # 为什么 autoflush=False？ 在 Web 请求中，数据可能需要
  # 在多个相关联的表中写入。手动控制 flush 时机可以避免
  # "引用了一个还没 flush 的对象"这类错误。 刷新
  autoflush=False,        # 手动 flush
  autocommit=False,       # 手动 commit
)

# 所有 ORM 模型的基类
class Base(DeclarativeBase):
  pass

# ═══════════════════════════════════════════
# FastAPI 依赖——每个请求获取独立的 Session
# ═══════════════════════════════════════════
def get_db():
  """FastAPI 依赖：请求到达时创建 session，响应返回后自动关闭"""
  db = SessionLocal()
  # 为什么要用 yield 而不是直接 return
  # 如果你用 return db，函数在返回 db 的那一刻就彻底死掉（结束）了，
  # 它根本没有机会执行后面的 db.close()。
  # 而 yield 可以在端点使用 db 时暂停，等端点执行完后再继续执行，确保 db 被正确关闭。
  try:
      yield db              # ← 端点使用这个 db
  finally:
      db.close()            # ← 无论成功与否，都关闭连接