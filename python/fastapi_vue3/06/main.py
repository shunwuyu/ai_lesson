# Path 路径参数
# Query 查询参数
from fastapi import FastAPI, Path, Query
# 注解类型
# Annotated 用于给类型附加额外元数据，常给 FastAPI 参数加校验、说明等附加规则。
from typing import Annotated # 注解类型

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Hello World"}
 
# FastAPI 依托 Pydantic，拿到 URL 里的字符串参数，自动强制转换成 int 类型。

# 路径参数
# 自动pydantic 
# http://127.0.0.1:8000/p/123
# http://127.0.0.1:8000/p/ddd
# @app.get("/p/{article_id}")
# async def article_detail(article_id: int):
#   return {"article_id": article_id}

# 升级版本 Annotated 表示注释一下
# Path 用于给路径参数添加校验规则
# ge 表示大于等于
# http://127.0.0.1:8000/p/1 报错
# Annotated[基础类型, 附加内容]，就是给参数类型额外加规则与元数据。
# Path()：标记这个变量是URL 路径参数
@app.get("/p/{article_id}")
async def article_detail(article_id: Annotated[int, Path(ge=2)]):
  return {"article_id": article_id}

# 查询参数
# http://127.0.0.1:8000/article/list?page=2&size=5
# @app.get('/article/list')
# async def article_list(page: int = 0, size: int = 10):
#   return {"page": page, "size": size}

@app.get('/article/list')
async def article_list(page: Annotated[int, Query(ge=1)] = 1,
  size: Annotated[int, Query(ge=10)] = 10):
  return {"page": page, "size": size}