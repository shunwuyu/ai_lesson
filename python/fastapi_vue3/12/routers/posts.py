"""
routers/posts.py — 文章路由

实现实战练习要求的全部接口（见文档 3.2 第 11 节）：
  POST   /posts/         创建文章（需要 user_id）
  GET    /posts/         获取所有已发布的文章（支持分页 skip/limit）
  GET    /posts/{id}     获取单篇文章详情（含作者信息）
  PATCH  /posts/{id}     更新文章（标题/内容/发布状态）
  DELETE /posts/{id}     删除文章

关键：GET /posts/ 使用 joinedload 解决 N+1 查询问题。
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas import PostCreate, PostUpdate, PostResponse, PostWithAuthor
import crud

router = APIRouter(prefix="/posts", tags=["文章管理"])


@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(post_in: PostCreate, user_id: int, db: Session = Depends(get_db)):
    """
    创建文章

    参数 user_id 通过查询参数传入（谁的作者），不在请求体中。
    """
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"用户 {user_id} 不存在",
        )
    return crud.create_user_post(db, post_in, user_id)


@router.get("/", response_model=list[PostWithAuthor])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    获取文章列表（含作者信息）

    使用 joinedload(Post.author) ——
    一次 LEFT JOIN 取代 N+1 次查询。
    """
    return crud.get_posts_with_author(db, skip=skip, limit=limit)


@router.get("/{post_id}", response_model=PostWithAuthor)
def read_post(post_id: int, db: Session = Depends(get_db)):
    """获取单篇文章详情（含作者信息）"""
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    return post  # Pydantic 通过 from_attributes=True 自动转换嵌套的 author


@router.patch("/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post_in: PostUpdate, db: Session = Depends(get_db)):
    """更新文章（PATCH — 部分更新）"""
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    return crud.update_post(db, post, post_in)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    """删除文章"""
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    crud.delete_post(db, post)