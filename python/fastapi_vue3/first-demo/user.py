# 引入日期类型
from datetime import date
# 引入模型类
from pydantic import BaseModel, ValidationError
# 引入列表类型
from typing import List
# 继承BaseModel 基类 这是一个数据校验模型 
class User(BaseModel):
  id: int
  name: str = 'John Doe' # 默认值
  date_joined: date | None # 可选值
  departments: List[str] | None

external_data = {
  'id': 123,
  'date_joined': '2030-06-01',
  'departments': ['技术部', '产品部']
}

# 捕获数据格式、类型不符合 User 模型规则时，Pydantic 抛出的校验异常，防止程序直接崩溃。
try:
  # 实例化 User 类, ** 解包字典
  user = User(**external_data)
  print(user.id, user.name)
  # model_dump()就是把 Pydantic 模型对象，转回普通 Python 字典
  # 对象不能转换为JSON 字符串
  print(isinstance(user, User))
  print(isinstance(user, BaseModel))
  print(user.model_dump())
  print(isinstance(user.model_dump(), dict))
# ValidationError是 Pydantic 专属数据校验异常
except ValidationError as e:
  print(e.errors())
