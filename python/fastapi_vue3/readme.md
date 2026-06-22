![](https://www.bilibili.com/video/BV1Vr25ByEpG?spm_id_from=333.788.videopod.episodes&vd_source=3d50341f547faf8df242a214b04f2d86)

# FastAPI + Vue3 + LangChain 实战

## FastAPI 

FastAPI 是基于 Python、依托 Pydantic（zod, 数据校验） 与 Starlette（异步 web 内核 koa），高性能、易开发、自带自动接口文档的现代异步 Web 框架

FastAPI = Pydantic + Starlette

- 准备环境
安装python https://www.python.org/ 
3.11 就好

Conda 是一个环境管理和包管理工具，用于创建隔离的 Python  环境和管理依赖。

创建虚拟环境
虚拟环境隔离各项目依赖版本，互不冲突，便于管理与部署，保护全局 Python。
conda init bash

conda create -n fastapi-env python=3.11

conda activate fastapi-env

- 安装 
···
pip install "fastapi[standard]"
···
安装在哪里？
```
pip show fastapi
```
```
Uvicorn 是 ASGI 异步 Web 服务器，用来运行 FastAPI 项目，standard 附带常用运行配套依赖。
pip install "uvicorn[standard]"
```

## 创建项目
- first-demo
  main.py
  test_main.http
  <!-- main = main.py 文件，app = 文件里实例化的 FastAPI 对象 -->
  <!-- uvicorn 启动服务运行项目，--reload 开启热重载，改代码自动重启服务。 -->
  uvicorn main:app --reload
  
  安装 httpYac
  test_main.http 就是接口测试文件，用 httpYac 可以直接运行。