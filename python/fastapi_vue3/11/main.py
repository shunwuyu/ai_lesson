"""3.1-sqlalchemy-demo.py — SQLAlchemy 2.0 基础完整演示"""
from sqlalchemy import create_engine, String, Integer, DateTime, ForeignKey, select, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, sessionmaker, relationship

# ═══════════════════════════════════════════════════════════
# 1. 引擎 & 会话
# ═══════════════════════════════════════════════════════════
engine = create_engine("sqlite:///./demo.db", echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# ═══════════════════════════════════════════════════════════
# 2. 基类 & 模型
# ═══════════════════════════════════════════════════════════
class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    age: Mapped[int | None] = mapped_column(default=None)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())

    posts: Mapped[list["Post"]] = relationship(back_populates="author")

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
Base.metadata.create_all(bind=engine)

# ═══════════════════════════════════════════════════════════
# 4. CRUD 演示
# ═══════════════════════════════════════════════════════════
def demo():
    session = SessionLocal()

    try:
        # ── Create ──
        user = User(username="张三", email="zhang@example.com", age=25)
        session.add(user)
        session.commit()
        session.refresh(user)
        print(f"✅ 创建用户: {user}")

        # ── Read ──
        stmt = select(User).where(User.username == "张三")
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
        session.rollback()
        print(f"❌ 出错: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    demo()