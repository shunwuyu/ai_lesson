from fastapi import APIRouter

router = APIRouter(prefix="/article", tags=["article"])

@router.get("/list")
async def article_list():
    return {"articles": ['aaa', 'bbb']}

@router.get("/{article_id}")
async def article_detail(article_id: int):
    return {"article_id": article_id}