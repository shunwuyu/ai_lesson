# 数据库配置
from sqlalchemy import create_engine
# 从 sqlalchemy.orm 库导入 DeclarativeBase, sessionmaker, Session，用来定义数据库模型和创建会话。
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
# 轻量级、文件型关系数据库，**无独立服务进程**，整个数据库就是一个 `.db` 文件，嵌入式，开箱即用
DATABASE_URL = "sqlite:///./blog.db"
# 创建数据库引擎，用来连接数据库。
# echo=True 会在控制台打印 SQL 语句，方便调试。
engine = create_engine(DATABASE_URL, echo=True)
# 创建会话工厂，用来创建数据库会话。
# engine 是底层连接驱动 session 是单次操作的工作台，用来做增删改查。
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Base 是所有 ORM 模型的父类，让模型和表映射、支持建表。
# **顶层定义的名字，默认全部对外可见**，没有 `export` 关键字
# DeclarativeBase 是声明式基类，继承它的类自动映射成数据库表。
class Base(DeclarativeBase):
    pass


def get_db():
    # 调用会话工厂，生成一个数据库会话实例（一次请求用一个）
  db = SessionLocal()
  try:
    # yield 把会话交给FastAPI路由使用，函数在这里暂停
    yield db
  finally:
    # 请求处理完毕、不管成功还是报错，都会执行，关闭会话释放连接
    db.close()