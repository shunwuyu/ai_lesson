from fastapi import APIRouter, Depends, HTTPException, status
from schemas import PostCreate, PostUpdate, PostResponse, PostWithAuthor
from database import get_db
from sqlalchemy.orm import Session
import crud

router = APIRouter(prefix="/posts", tags=["文章管理"])

# 创建文章必须挂在某个用户下，所以 user_id 作为查询参数传入
@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(user_id: int, post_in: PostCreate, db: Session = Depends(get_db)):
    """为指定用户创建文章"""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在",
        )
    return crud.create_post(db, post_in, user_id=user_id)

@router.get("/", response_model=list[PostWithAuthor])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """获取文章列表（带作者信息）"""
    return crud.get_posts(db, skip=skip, limit=limit)

@router.get("/{post_id}", response_model=PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    """获取单个文章"""
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="文章不存在",
        )
    return post

# 获取某个用户的文章列表
@router.get("/user/{user_id}", response_model=list[PostResponse])
def read_user_posts(user_id: int, db: Session = Depends(get_db)):
    """获取指定用户的所有文章"""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在",
        )
    return crud.get_user_posts(db, user_id)

@router.patch("/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post_in: PostUpdate, db: Session = Depends(get_db)):
    """更新文章"""
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
