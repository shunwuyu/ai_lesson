# import sqlalchemy
# print(sqlalchemy.__version__)  # 应该 ≥ 2.0.0
from sqlalchemy import create_engine
# SQLite 引擎（文件存在则连接，不存在则创建）
# 使用 SQLite，db 文件在当目录
# echo=True: 在控制台打印所有 SQL
engine = create_engine("sqlite:///./test.db", echo=True)
