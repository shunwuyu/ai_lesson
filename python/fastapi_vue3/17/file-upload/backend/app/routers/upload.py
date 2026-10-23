# UploadFile 用于处理上传的文件
# File 用于处理文件上传
from fastapi import APIRouter, UploadFile, File, HTTPException

from ..services.file_service import validate_file, save_file

router = APIRouter(prefix="/api", tags=["upload"])

# ... 表示必填参数
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    validate_file(file)
    result = save_file(file)
    return {"code": 0, "message": "上传成功", "data": result}