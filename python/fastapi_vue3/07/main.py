from fastapi import FastAPI
# Field 用于自定义字段的元数据
# BaseModel 就是 Pydantic 的基类，继承它就能自动获得数据校验、转模型的全套能力。
from pydantic import BaseModel,Field
# Field：用来给模型字段加额外规则，比如默认值、最大最小值、注释描述，补充类型注解做不到的校验。
from typing import Annotated

app = FastAPI()
# 啥都没有、空、不存在」的特殊对象，不是 0，不是空字符串
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
  # Pydantic 模型实例，转成普通 Python 字典
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