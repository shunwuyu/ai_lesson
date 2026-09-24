# Depends 是 FastAPI 的依赖注入工具，
# 用于声明并加载前置依赖函数
# 自动执行前置逻辑并将返回值注入接口参数。
from fastapi import Depends, FastAPI 
from typing import Annotated, Dict

app = FastAPI()
# 通用分页查询参数依赖函数
# 它自动接收 URL 的q、skip、limit查询参数并完成校验；
async def common(q: str | None = None, skip: int = 0, limit: int=10):
  return { "q": q, "skip": skip, "limit": limit }

async def page_common(page: int=1, size: int=10):
    return {"page": page, "size": size}
# 解决接口**公共查询参数重复写**的问题。
# 多个接口都要用 q、skip、limit，不用每个接口重复定义参数，抽成 Depends 依赖，直接复用，改一处全部生效.
@app.get('/items')
async def read_items(common: Dict=Depends(common)):
    print(common.get('q'), common.get('skip'), common.get('limit'))
    return {"message": "ok", "q": common.get('q')}

@app.get("/users")
async def read_users(common: Dict=Depends(common)):
    print(common.get('q'), common.get('skip'), common.get('limit'))
    return common

# /user/list
@app.get("/user/list")
async def get_user_list(page_params: Dict=Depends(page_common)):
    page = page_params.get('page')
    size = page_params.get('size')
    return {"page": page, "size": size}

# /movie/list
@app.get("/movie/list")
async def get_movie_list(page_params: Dict=Depends(page_common)):
    page = page_params.get('page')
    size = page_params.get('size')
    return {"page": page, "size": size}

if __name__ == "__main__":
  import uvicorn
  uvicorn.run("main:app", host="127.0.0.1", port=8080, 
  reload=True)