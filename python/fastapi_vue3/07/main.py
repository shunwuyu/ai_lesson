from fastapi import FastAPI
# Field 用于自定义字段的元数据
from pydantic import BaseModel,Field
from typing import Annotated

app = FastAPI()

class Item(BaseModel):
  name: str
  # 联合类型
  description: str | None = None
  price: float
  tax: float | None = None

@app.put('/items/{item_id}')
async def update_item(item_id: int, item: Item):
  # item.model_dump() 得到完整字典
  # ** 解包字典， 合并到 result 字典中 相当于es6 ...
  # 更新的数据传过来 
  # 校验不通过返回错误信息
  result = {"item_id": item_id, **item.model_dump()}
  return result

# {
#     "name":"hah",
#     "description":"123",
#     "price":1.23,
#     "tax": 2.34
# }

# 登录案例
# 定义登录请求模型， 用于约束登录请求体参数的格式和类型
class LoginIn(BaseModel):
  # ... 表示必填项
  email: Annotated[str, Field(..., description="邮箱地址")]
  password: Annotated[str, Field(..., min_length=6, max_length=20, description="密码")]

@app.post('/login')
async def login(data:LoginIn):
  email = data.email
  password = data.password
  return {"email": email, "password": password}