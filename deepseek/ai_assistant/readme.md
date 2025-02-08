[source](https://www.bilibili.com/cheese/play/ss65638?query_from=0&search_id=13349807251087926718&search_query=deepseek&csource=common_hpsearch_null_null&spm_id_from=333.337.search-card.all.click)

- 创建项目
  - python 虚拟环境
  - 激活虚拟环境
- 项目需要的文件及文件夹
- deepseek api
- 前端
- 后端服务  flask
- js 

## 开始

- 安装python
  - exe
  - 第一步 
    customize installation
    勾选 add to path 
  - 第二部
    全选
  - 第三步
    安装 for all users
    安装目录
  - 第四步
    验证 命令行输入python 3.12.8

- python 换源
  windows
  md %APPDATA%\pip
  echo [global] > %APPDATA%\pip\pip.ini
  echo index-url = https://mirrors.aliyun.com/pypi/simple/ >> %APPDATA%\pip\pip.ini

  mac
    mkdir -p ~/.pip
    vi ~/.pip/pip.conf
    [global]
    index-url = https://mirrors.aliyun.com/pypi/simple/
    trusted-host = mirrors.aliyun.com
- pip install requests 看下是否OK

- vscode 插件
  - 中文
  - live server

- python 虚拟环境创建
  python -m venv venv
  使用Python的venv模块创建名为venv的虚拟环境，以隔离管理项目依赖，避免版本冲突。
  不同的项目可以拥有独立的依赖关系，避免了版本冲突问题

- 激活环境
  C:\Users\33124\Desktop\ai_website\venv\Scripts\activate
  mac
  source venv/bin/activate 
  可以看到前面有了venv 表示激活成功

## 流程
- 去创建项目
  1. 创建并激活虚拟环境

二、 创建所需要的文件夹和文件
  - static  css img js index.html
  - app.py 后端入口文件
  - .env DeepSeek Key

三、 获取deepseek api key
  https://platform.deepseek.com/api_keys

四、写前端页面
  index.html

五、css

六、 App.py
  Code Spell Checker

  接口文档
  from openai import OpenAI

client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ],
    stream=False
)

print(response.choices[0].message.content)
  - 代码单词敲错 code spell checker

  - 安装 pip install openai Flask python-dotenv


- js 
  scroll 效果
  打字机效果
