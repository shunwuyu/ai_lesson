# func 函数，用于在 SQL 查询中使用数据库函数
# select 用于构造查询语句对象，搭配会话执行实现数据库数据查询
from sqlalchemy import create_engine,String, Integer, DateTime, ForeignKey, func, select
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column, relationship
# 1. 引擎 & 会话
# 引擎管理 SQLite 连接与数据库底层驱动；
# 会话负责事务、CRUD 操作，隔离数据库交互，控制提交回滚。
engine = create_engine("sqlite:///./demo.db", echo=True)
# bind 参数绑定引擎，指定会话使用哪个引擎
# 造出会话工厂 
# 统一配置会话参数
# autoflush 是否自动提交内存中的修改到数据库
# autocommit 关闭自动事务提交，所有增改操作都要手动执行 `session.commit()` 才真正存入数据库。
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# ═══════════════════════════════════════════════════════════
# 2. 基类 & 模型
# ═══════════════════════════════════════════════════════════
# ORM 模型基类，所有数据表模型都要继承它
# 继承后自动映射 Python 类 ↔ SQLite 数据表，自动生成表结构、字段映射规则
# 为什么要包一层空 Base
# 统一管理所有数据表模型
# 方便全局扩展模型
# 解耦第三方类 
# 以后换 ORM 版本，只改 Base 一处即可，不动所有 User、Article 业务模型。
class Base(DeclarativeBase):
  pass # 空类，用于继承，
  # `pass`是空语句，表示**什么都不执行**。这个位置语法上必须有代码块，pass 占位，不写会报错。
    
# Mapped 类型，用于定义模型字段的类型
# mapped_column 函数，用于定义模型字段的映射规则
class User(Base):
    __tablename__ = "users"
    # 类型注解
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    age: Mapped[int | None] = mapped_column(default=None)
    is_active: Mapped[bool] = mapped_column(default=True)
    # func 用来调用数据库内置函数
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    # ORM 关系映射（一对多）
    # 拿到 user 对象，直接 `user.posts`，就能拿到该用户全部帖子对象列表，不用自己写 JOIN 查询。
    # back_populates 指定对方模型关联属性，实现双向关系同步，两边对象状态自动保持一致。
    posts: Mapped[list["Post"]] = relationship(back_populates="author")
    # 定义模型的 __repr__ 方法，用于在调试时打印模型实例
    # __repr__ 方法返回一个字符串，描述模型实例的属性值
    def __repr__(self):
      return f"<User(id={self.id}, username='{self.username}')>"

class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200))
    content: Mapped[str] = mapped_column(String(5000))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    author: Mapped["User"] = relationship(back_populates="posts")

    def __repr__(self):
        return f"<Post(id={self.id}, title='{self.title}')>"

# ═══════════════════════════════════════════════════════════
# 3. 建表
# ═══════════════════════════════════════════════════════════
# 会检查表是否存在 表不存在才新建；已有同名表会直接跳过，无修改、无删除。

Base.metadata.create_all(bind=engine)

# ═══════════════════════════════════════════════════════════
# 4. CRUD 演示
# ═══════════════════════════════════════════════════════════
def demo():
  # 创建会话实例 相当于数据库操作句柄
  session = SessionLocal()
  try:
    # ── Create ──
    user = User(username="张三", email="zhang@example.com", age=25)
    # 新增用户
    session.add(user)
    # 提交事务，将新增用户写入数据库
    # 不提交事务，新增用户不会被写入数据库，仅在会话中可见
    session.commit()
    # 刷新用户实例，确保获取到最新数据
    # 刷新后，用户实例的属性值会更新为数据库中的最新值
    # 刷新后，用户实例的 posts 属性会包含所有关联的帖子
    session.refresh(user)
    print(f"✅ 创建用户: {user}")

    # ── Read ──
    # 查询用户名为 "张三" 的用户
    stmt = select(User).where(User.username == "张三")
    print(stmt);
    # 执行查询，返回结果集 scalars 
    # scalars 就是自动去掉查询结果外层括号包装，直接给你要的数据 / 模型对象。
    # first 方法返回第一个结果，如果没有结果则返回 None
    found = session.scalars(stmt).first()
    print(f"✅ 查询用户: {found}")

    # ── Update ──
    found.age = 26
    session.commit()
    print(f"✅ 更新年龄: {found.age}")

    # ── Delete ──
    # session.delete(found)
    # session.commit()
    # print(f"✅ 删除用户: {found}")

  except Exception as e:
    # 回滚事务，撤销所有操作
    session.rollback()
  finally:
    # 关闭会话，释放数据库连接
    session.close()
if __name__ == "__main__":
  demo()