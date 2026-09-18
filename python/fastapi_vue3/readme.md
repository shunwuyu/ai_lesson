![](https://www.bilibili.com/video/BV1Vr25ByEpG?spm_id_from=333.788.videopod.episodes&vd_source=3d50341f547faf8df242a214b04f2d86)

https://github.com/m12305/hello-FastAPI/tree/main

# FastAPI + Vue3 + LangChain 实战

## FastAPI 

FastAPI 是 Python 写的高性能 Web 接口框架，上手简单还速度快，性能能比肩 Go、Node。自动生成交互式接口文档，写代码少，自带类型提示，写错参数直接提示。专门用来做后端 API，写接口不用折腾繁琐配置，开发效率很高，异步支持也原生自带，现在很多项目都在用，很适合快速做后端服务。

FastAPI = Pydantic + Starlette（负责 Web 底层。接收 HTTP 请求、路由匹配、返回响应，处理网络那一套，自带异步能力，是高性能的 Web 底座。）
Pydantic（数据校验 有点像 zod）
路由参数 
/user/123   123 字符串转整数  必传


Starlette（异步）
async/await 
- 等数据库查询
- 等文件读写
...
不用傻等，继续执行后续代码。 有利于提高并发量，减少响应时间。


- 准备环境
安装python https://www.python.org/ 
3.11 就好

hello world

```
print("Hello, World!")
```
### conda 

conda 是一个环境管理和包管理工具，用于创建隔离的 Python  环境和管理依赖。
四个朋友开麻将房， 一个个小包间， 有的打2块的， 有的打5块的。
创建虚拟环境
虚拟环境隔离各项目依赖版本，互不冲突，便于管理与部署，保护全局 Python。

anaconda 太大了， 有几个G, 我们安装miniconda, 就够用了。

百度搜 中科大镜像源 输入框输入anaconda
点进去 miniconda 选择相应版本
conda 26.3.2

conda --version

conda init bash  直接打开 bash 输 conda 提示命令不存在：必须执行一次，重载终端后就能永久使用 conda；
安装时勾选了添加到系统环境变量，或是用 Anaconda Prompt 专用终端：不用执行，开箱即用。
执行以下， 再打开。
conda env list 列出所有环境
conda create -n fastapi-env python=3.11

conda activate fastapi-env
deactivate 退出（有需要用）
conda env remove -n 环境名

- 安装 
···
<!-- 安装 FastAPI 框架本体 standard日常开发必备的全套配套工具 -->
pip install "fastapi[standard]"
···

```
uvicorn 是 异步 Web 服务器，用来运行 FastAPI 项目，standard 附带常用运行配套依赖。
uvicorn 跑 async 接口，能同时处理大量请求，不像老服务器要等一个任务做完才接下一个。
pip install "uvicorn[standard]"
```
- 查看安装在哪里
```
pip show fastapi
```

## 创建项目
- first-demo
  main.py
  <!-- test_main.http -->
  <!-- main = main.py 文件，app = 文件里实例化的 FastAPI 对象 -->
  <!-- uvicorn 启动服务运行项目，--reload 开启热重载，改代码自动重启服务。 -->
  <!-- 当前环境里的 -->
  python -m uvicorn main:app --reload --port 8080  
  main 文件里的 app 实例
  -m 作为模块运行
  main:app 从 main.py 文件中导入 app 对象
  
## pydantic

user.py
'123'  字符串转整数  
Pydantic 是 Python 的数据校验库zod，自带智能类型强制转换，合法数字字符串"123"会自动转为 int 类型，不符合格式才会抛出校验错误。
面向对象， 数据校验、类型转换、数据格式化

