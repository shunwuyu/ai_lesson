# 数据库 ORM 库，可面向对象操作数据库，不用手写大量 SQL
# import sqlalchemy
# print(sqlalchemy.__version__)  # 应该 ≥ 2.0.0
# create_engine 创建数据库引擎，建立程序与数据库连接，提供会话执行数据库操作。
from sqlalchemy import create_engine
# # SQLite 引擎（文件存在则连接，不存在则创建）
# # 使用 SQLite，db 文件在当目录
# # echo=True: 在控制台打印所有 SQL
# 进程的当前工作目录 (CWD) Current Working Directory
engine = create_engine("sqlite:///./test.db", echo=True)
