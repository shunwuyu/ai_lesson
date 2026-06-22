from fastapi import FastAPI, Path, Query
# Annotated 用于给类型附加额外元数据，常给 FastAPI 参数加校验、说明等附加规则。
from typing import Annotated # 注解类型

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Hello World"}
 
# FastAPI 依托 Pydantic，拿到 URL 里的字符串参数，自动强制转换成 int 类型。

# 路径参数
# @app.get("/p/{article_id}")
# async def article_detail(article_id: int):
#   return {"article_id": article_id}

# 升级版本 Annotated 表示注释一下
# Path 用于给路径参数添加校验规则
# ge 表示大于等于
@app.get("/p/{article_id}")
async def article_detail(article_id: Annotated[int, Path(ge=2)]):
  return {"article_id": article_id}

# 查询参数
# @app.get('/article/list')
# async def article_list(page: int = 0, size: int = 10):
#   return {"page": page, "size": size}

@app.get('/article/list')
async def article_list(page: Annotated[int, Query(ge=1)] = 1,
  size: Annotated[int, Query(ge=10)] = 10):
  return {"page": page, "size": size}