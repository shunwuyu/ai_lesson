from fastapi import APIRouter
# Python 无显式导出，直接导入模块变量，经主程序挂载后接口才对外生效。
router = APIRouter(prefix="/user", tags=["user"])

@router.get("/list")
async def user_list():
    return {"users": ['张三', '李四']}

@router.get('/{user_id}')
async def user_detail(user_id: int):
    return {"user_id": user_id}