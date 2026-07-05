# 引入日期类型
from datetime import date
# 引入数据模型基类， 请求参数自动校验、类型转换、数据格式化
# ValidationError 用于异常捕获
from pydantic import BaseModel, ValidationError
# 引入列表类型
from typing import List
# 继承BaseModel 基类 这是一个数据校验模型 
class User(BaseModel):
  id: int
  name: str = 'John Doe' # 默认值
  date_joined: date | None # 可选值
  departments: List[str] | None
# 直接写变量名 = 值， 不需要任何声明关键字
# 随便改值，就是普通变量
# 变量名全部大写 = 视为常量，约定不要修改， 
# 只是人为规范，代码语法上依旧能改。
external_data = {
  # 'id': 123,
  'id': 'a123',
  'date_joined': '2030-06-01',
  'departments': ['技术部', '产品部']
}

# 捕获数据格式、类型不符合 User 模型规则时，Pydantic 抛出的校验异常，防止程序直接崩溃。
try:
  # 实例化 User 类, ** 解包字典
  # 解包运算符（
  user = User(**external_data)
  print(user.id, user.name)
  # model_dump()就是把 Pydantic 模型对象，转回普通 Python 字典
  # 对象不能转换为JSON 字符串
  print(isinstance(user, User))
  print(isinstance(user, BaseModel))
  # 把 Pydantic 模型对象，转回普通 Python 字典
  print(user.model_dump())
  print(isinstance(user.model_dump(), dict))
# ValidationError是 Pydantic 专属数据校验异常
except ValidationError as e:
  print(e.errors())
