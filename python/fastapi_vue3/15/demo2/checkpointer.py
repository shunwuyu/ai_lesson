# 轻量级文本关系型数据库
import sqlite3
# 从 SQLite 数据库中加载检查点
# from langgraph.checkpoint.memory import MemorySaver 对比 服务器重启还在
from langgraph.checkpoint.sqlite import SqliteSaver
# 私有常量
_DB_PATH = "checkpoints.db"
# SQLite 数据库连接对象
_connection: sqlite3.Connection | None = None

def get_connection() -> sqlite3.Connection:
    # 获取 SQLite 数据库连接对象
    # 不是局部变量，而是模块顶层那个全局变量，函数里对它的修改会真正改到外面的那个变量
    # 读取可以，但赋值不行
    # 不重复创建连接对象
    global _connection
    if _connection is None:
        _connection = sqlite3.connect(_DB_PATH, check_same_thread=False)
    return _connection

# 基于 SQLite 创建一个 LangGraph 的状态检查点保存器
def get_checkpointer() -> SqliteSaver:
    return SqliteSaver(get_connection())

def close_connection():
    global _connection
    if _connection is not None:
        _connection.close()
        _connection = None