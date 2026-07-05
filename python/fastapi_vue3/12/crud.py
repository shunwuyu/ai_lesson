"""
crud.py — CRUD 操作函数，把数据逻辑从路由中抽离

路由只负责：接收请求 → 调用 crud → 返回响应。
所有数据库操作集中在这里，方便测试和复用。
"""
# joinedload 加载关联的实体
from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy import select
from models import User, Post
from schemas import UserCreate, UserUpdate, PostCreate, PostUpdate


# ═══════════════════════════════════════════
# User CRUD
# ═══════════════════════════════════════════

def get_user(db: Session, user_id: int) -> User | None:
    """按 ID 获取用户"""
    # SQLAlchemy 内置查询方法
    return db.get(User, user_id)


def get_user_by_email(db: Session, email: str) -> User | None:
    """按邮箱查找用户"""
    stmt = select(User).where(User.email == email)
    # scalars(stmt) 把查询结果转换为 Python 对象
    return db.scalars(stmt).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    """获取用户列表（分页）"""
    stmt = select(User).offset(skip).limit(limit)
    # list[User] 把查询结果转换为 Python 对象列表
    # list() 把可迭代对象变成列表
    return list(db.scalars(stmt).all())


def create_user(db: Session, user_in: UserCreate) -> User:
    """创建新用户——密码存入前要哈希（此处简化处理）"""
    # ⚠️ 实际项目请用 bcrypt / passlib 做真实哈希
    db_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password="hashed_" + user_in.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: User, user_in: UserUpdate) -> User:
    """更新用户信息（只更新传了的字段）"""
    update_data = user_in.model_dump(exclude_unset=True)

    # 如果传了新密码，需要哈希后存入
    if "password" in update_data:
        # 实际项目用 bcrypt：bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        update_data["hashed_password"] = "hashed_" + update_data.pop("password")

    for field, value in update_data.items():
        # 根据字符串变量名给对象设值
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user: User) -> None:
    """删除用户"""
    db.delete(user)
    db.commit()


# ═══════════════════════════════════════════
# Post CRUD
# ═══════════════════════════════════════════

def get_post(db: Session, post_id: int) -> Post | None:
    """按 ID 获取文章"""
    return db.get(Post, post_id)


def get_posts(db: Session, skip: int = 0, limit: int = 100) -> list[Post]:
    """获取文章列表（分页，按时间倒序）"""
    stmt = select(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


def get_posts_with_author(db: Session, skip: int = 0, limit: int = 100) -> list[Post]:
    """
    获取文章列表 + 作者信息 —— 用 joinedload 解决 N+1 问题

    SQL：SELECT posts.*, users.* FROM posts LEFT JOIN users ON ...
    一次查询拿回所有数据，不会循环发 SQL。
    """
    stmt = (
        select(Post)
        .options(joinedload(Post.author))  # ← LEFT JOIN users
        .order_by(Post.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).unique().all())


def get_posts_by_user(db: Session, user_id: int) -> list[Post]:
    """获取某个用户的所有文章"""
    stmt = select(Post).where(Post.user_id == user_id)
    return list(db.scalars(stmt).all())


def create_user_post(db: Session, post_in: PostCreate, user_id: int) -> Post:
    """为用户创建文章（user_id 从路由参数获取，不在请求体中）"""
    db_post = Post(**post_in.model_dump(), user_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(db: Session, post: Post, post_in: PostUpdate) -> Post:
    """更新文章（只更新传了的字段）"""
    update_data = post_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(post, field, value)
    db.commit()
    db.refresh(post)
    return post


def delete_post(db: Session, post: Post) -> None:
    """删除文章"""
    db.delete(post)
    db.commit()