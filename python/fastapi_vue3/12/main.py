"""
Alchemy炼金术  通过它的ORM 层， 将这些SQL低级操作炼成高级的python对象操作
3.2 SQLAlchemy + FastAPI 集成 — 可运行 Demo

启动方式:
    cd code/阶段3-数据库与ORM/3.2-SQLAlchemy+FastAPI集成
    uvicorn main:app --reload

访问 http://127.0.0.1:8000/docs 交互式测试。

项目结构（对照文档第 2 节）:
    main.py              ← FastAPI 应用入口 + 路由注册
    database.py           ← 引擎、会话工厂、Base、get_db 依赖
    models.py             ← SQLAlchemy ORM 模型（表定义） 厨房食材
    schemas.py            ← Pydantic 模型（请求/响应的数据结构）菜单——只展示客人该看的东西 密码不能给
    crud.py               ← CRUD 操作函数（增删改查的业务逻辑）
    routers/              ← 路由模块（按资源拆分）
        users.py           ← 用户路由
        posts.py           ← 文章路由

关键知识点:
  1. Depends(get_db) 用 yield（暂离一会儿） 管理 Session 生命周期
  2. ConfigDict(from_attributes=True) 让 Pydantic 能读取 ORM 对象
  3. joinedload() 解决 N+1 查询问题
  4. 数据模型 (models) 和 API 模型 (schemas) 必须分离

curl 测试:
    # ─── 用户 ───
    curl -X POST http://127.0.0.1:8000/users/ \
      -H "Content-Type: application/json" \
      -d '{"username":"张三","email":"zhang@example.com","password":"12345678"}'

    curl -X POST http://127.0.0.1:8000/users/ \
      -H "Content-Type: application/json" \
      -d '{"username":"李四","email":"li@example.com","password":"12345678"}'

    curl http://127.0.0.1:8000/users/

    curl http://127.0.0.1:8000/users/1

    curl -X PATCH http://127.0.0.1:8000/users/1 \
      -H "Content-Type: application/json" \
      -d '{"username":"张三丰"}'

    curl -X DELETE http://127.0.0.1:8000/users/1

    # ─── 文章 ───
    curl -X POST "http://127.0.0.1:8000/posts/?user_id=1" \
      -H "Content-Type: application/json" \
      -d '{"title":"Hello FastAPI","content":"这是第一篇文章"}'

    curl -X POST "http://127.0.0.1:8000/posts/?user_id=1" \
      -H "Content-Type: application/json" \
      -d '{"title":"SQLAlchemy 笔记","content":"ORM 让数据库操作更优雅"}'

    # 文章列表（含作者，一次 JOIN 解决 N+1）
    curl http://127.0.0.1:8000/posts/

    curl http://127.0.0.1:8000/posts/1

    curl -X PATCH http://127.0.0.1:8000/posts/1 \
      -H "Content-Type: application/json" \
      -d '{"published":true}'

    curl -X DELETE http://127.0.0.1:8000/posts/1
"""

from fastapi import FastAPI
# 一个.py 文件就是一个模块 database 模块
# 顶层定义的变量等直接向外部暴露
# 一个带__init__.py 文件的目录就是一个包 package 包

from database import engine, Base
from routers import users, posts

# 建表
# Base 所有 ORM 模型类的"祖宗" 有点像js 里的Object
# Base 给了 User ORM 能力
# class Base {
  #   static metadata = { tables: [] }

  #   static createAll() {
  #     // 遍历所有继承 Base 的类，执行 CREATE TABLE
  #   }
  # }
# 指定用这个引擎去建表
Base.metadata.create_all(bind=engine)
# 创建 FastAPI 应用实例
app = FastAPI(
    title="Blog API",
    description="FastAPI + SQLAlchemy 博客系统 — 标准项目结构演示",
    version="1.0.0",
)

# 注册路由 
app.include_router(users.router)
app.include_router(posts.router)

# http://127.0.0.1:8000/docs
# FastAPI 内置的，零配置自带 Swagger UI
# Swagger UI 就是 FastAPI 白送的一个网页版测试工具，你打开 /docs 
# 就能直接在浏览器里点按钮调用接口、看返回结果，不用自己写 curl
# 代码就能直接在 Swagger UI    很拽地"展示自己                                   
# 上测试每个接口是否正常工作、返回数据对不对。      
@app.get("/")
def root():
    return {
        "message": "Blog API",
        "docs": "/docs",
        "endpoints": {
            "POST /users/": "创建用户",
            "GET /users/": "用户列表",
            "GET /users/{id}": "用户详情",
            "PATCH /users/{id}": "更新用户",
            "DELETE /users/{id}": "删除用户",
            "POST /posts/?user_id=1": "创建文章",
            "GET /posts/": "文章列表（含作者，已解决 N+1）",
            "GET /posts/{id}": "文章详情",
            "PATCH /posts/{id}": "更新文章",
            "DELETE /posts/{id}": "删除文章",
        },
    }
# Python 内置的模块级变量
# 只有当该文件被直接运行 python main.py
# 直接用 python -m uvicorn main:app --reload

if __name__ == "__main__":
    # import 可以在任何作用域使用 模块顶层、函数内部、类内部──
  # 条件分支中都可以
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)