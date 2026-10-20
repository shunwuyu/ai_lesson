from sqlalchemy.orm import Session
from models import User, Post
from sqlalchemy import select
from schemas import UserCreate, UserUpdate, PostCreate, PostUpdate
import bcrypt


def get_user_by_email(db: Session, email: str) -> User | None:
    """按邮箱查找用户"""
    stmt = select(User).where(User.email == email)
    # 执行查询，返回结果集的第一个元素（如果存在）
    # 如果结果集为空，返回 None
    # 如果结果集有多个元素，返回第一个元素
    return db.scalars(stmt).first()

def create_user(db: Session, user_in: UserCreate) -> User:
    """创建新用户"""
    hashed = bcrypt.hashpw(
        user_in.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    db_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hashed,
    )
    # 把新用户添加到数据库会话中
    db.add(db_user)
    # 提交事务，将新用户保存到数据库
    db.commit()
    # 刷新数据库会话中的用户对象，确保返回的是最新数据
    # 这一步是必须的，否则返回的用户对象会包含未提交的修改
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    """获取用户列表（分页）"""
    stmt = select(User).offset(skip).limit(limit)
    # scalars 帮你把查询结果解包
    return list(db.scalars(stmt).all())

def get_user(db: Session, user_id: int) -> User | None:
    """按 ID 获取用户"""
    # 在 User 表中，通过主键 ID 查找指定的用户记录并返回
    return db.get(User, user_id)

def update_user(db: Session, user: User, user_in: UserUpdate) -> User:
    """更新用户信息（只更新传了的字段）"""
    # 把请求体中的字段转换为字典，排除 None 值
    # 这样可以只更新传了的字段，而不是所有字段
    update_data = user_in.model_dump(exclude_unset=True)

    if "password" in update_data:
        update_data["hashed_password"] = bcrypt.hashpw(
            update_data.pop("password").encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user: User) -> None:
    """删除用户"""
    db.delete(user)
    db.commit()


# ═══════════════════════════════════════════
# Post 相关
# ═══════════════════════════════════════════

def create_post(db: Session, post_in: PostCreate, user_id: int) -> Post:
    """为指定用户创建文章"""
    db_post = Post(
        title=post_in.title,
        content=post_in.content,
        published=post_in.published,
        user_id=user_id,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts(db: Session, skip: int = 0, limit: int = 100) -> list[Post]:
    """获取文章列表（分页）"""
    stmt = select(Post).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())

def get_post(db: Session, post_id: int) -> Post | None:
    """按 ID 获取文章"""
    return db.get(Post, post_id)

def get_user_posts(db: Session, user_id: int) -> list[Post]:
    """获取指定用户的所有文章"""
    stmt = select(Post).where(Post.user_id == user_id)
    return list(db.scalars(stmt).all())

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