# uuid 是 Python 内置模块，用来生成全局唯一 ID，适合给上传文件起名避免重名。
import uuid
# pathlib 是 Python 内置模块，用来处理文件路径。
from pathlib import Path
# 从 ..config 模块导入上传目录、最大文件大小、允许的文件扩展名和 MIME 类型。
from ..config import UPLOAD_DIR, MAX_FILE_SIZE, ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES
from fastapi import HTTPException, UploadFile, status


def validate_file(file: UploadFile) -> None:
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="文件名无效")
    # 取后缀再小写
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"不支持的文件类型：{ext}")

    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"不支持的 MIME 类型：{file.content_type}")
    # 把文件指针移到文件末尾
    file.file.seek(0, 2)
    # 用 tell 拿到文件总大小
    # `tell()` 返回当前文件指针相对于文件开头的字节偏移量。
    size = file.file.tell()
    # 再把指针挪回开头
    file.file.seek(0)

    if size > MAX_FILE_SIZE:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="文件超过 10MB")


def save_file(file: UploadFile) -> dict:
    # 保存文件到指定目录
    # 创建上传文件夹，`parents=True` 自动建父目录，`exist_ok=True` 目录已存在也不报错。
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    original_name = Path(file.filename).name
    # 拿到**不带后缀的文件名**
    # hex 32 位十六进制字符串
    unique_name = f"{Path(original_name).stem}_{uuid.uuid4().hex}{Path(original_name).suffix}"
    target_path = UPLOAD_DIR / unique_name
    # 打开文件，`wb` 表示二进制写入，`with` 表示自动关闭文件。
    with target_path.open("wb") as buffer:
        # 读取文件内容，每次读取 1MB，直到读取完所有内容。
        while chunk := file.file.read(1024 * 1024):
            buffer.write(chunk)

    return {
        "original_name": original_name,
        "saved_name": unique_name,
        "size": target_path.stat().st_size,
    }