def Merge(dict1, dict2):
  # 使用 ** 操作符将字典 dict1 和 dict2 合并成一个新的字典
  res = {**dict1, **dict2}

  return res

dict1 = {"name": "John Doe", "age": 25}
dict2 = {"name": "Jone Doe", "city": "London"}
dict3 = Merge(dict1, dict2)
print(dict3)