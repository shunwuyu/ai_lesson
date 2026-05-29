- 什么是“容器化”?

把“应用 + 运行环境”打包成一个盒子，在哪都能跑。

比如 火锅

买一堆的菜品， 火锅料很重要， 还要有火锅窝子等

自热火锅就方便多了

Docker 解决环境不一致、部署繁琐、资源浪费问题，实现应用打包隔离、快速迁移与统一运行。

- 举例

比如你写了一个 Node 项目：

npm install
npm run dev

但在别人电脑上：

Node 版本不对 ❌
缺依赖 ❌
环境变量不一样 ❌

👉 结果：“在我电脑是好的啊 🤷‍♂️”

容器化解决什么？

容器 = 一个“隔离的小电脑”

里面包括：

Node 版本 ✅
依赖 ✅
系统环境 ✅
你的代码 ✅

👉 别人只需要运行这个容器：

docker run xxx

二、Docker 是什么？

👉 一句话：

Docker 是用来创建和运行“容器”的工具

你可以理解为：

概念	类比
镜像（Image）	安装包
容器（Container）	运行中的程序
Docker	应用商店 + 虚拟机

最小上手案例

1. 跑一个现成的服务
docker run hello-world
Hello from Docker!

2. 跑一个 Web 服务（重点）

docker run -d -p 3000:80 nginx 

解释一下：

参数	作用
-d	后台运行
-p 3000:80	本机3000 → 容器80端口
nginx	镜像

http://localhost:3000

你会看到 nginx 页面 ✔

- 自己做一个容器（核心）

我们用一个 Node 项目举例。

npm init -y
npm install express

// index.js
const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello Docker!")
})

app.listen(3000, () => {
  console.log("Server running")
})

2. 写 Dockerfile（最关键）

# 基础环境
FROM node:18

# 工作目录
WORKDIR /app

# 复制文件
COPY . .

# 安装依赖
RUN npm install

# 启动命令
CMD ["node", "index.js"]

3. 构建镜像

docker build -t my-app .

4. 运行容器

docker run -p 3000:3000 my-app

浏览器打开：

http://localhost:3000

你必须掌握的 5 个命令

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop <id>

# 删除容器
docker rm <id>

# 查看镜像
docker images

自己做一个容器 我怎么给对方使用呢？ 

这个问题问得很好 👍 ——你已经从“会用 Docker”进入到“怎么交付项目”了。

我直接用最实际的方式讲：别人怎么用你做的容器？

一、核心答案（一句话）

👉 你需要把你的“镜像”发给别人

方法有 3 种（从简单到专业）：

导出成文件（发给别人）
上传到仓库（推荐）
给源码 + Dockerfile（最常见）
二、方式 1：打包成文件（最简单）

适合：发给同事 / 拷U盘 / 内网

📦 你做的事
docker save -o my-app.tar my-app

👉 得到一个文件：

my-app.tar
📥 对方做的事
docker load -i my-app.tar

然后运行：

docker run -p 3000:3000 my-app

✔ 完成

👍 优点
不用联网
简单粗暴
👎 缺点
文件大
不方便更新
三、方式 2：上传到仓库（最推荐🔥）

就像你发 npm 包一样。

最常用平台：

Docker Hub
GitHub Container Registry
🚀 步骤
1️⃣ 登录
docker login
2️⃣ 给镜像打标签
docker tag my-app yourname/my-app:1.0
3️⃣ 上传
docker push yourname/my-app:1.0
📥 对方怎么用
docker pull yourname/my-app:1.0
docker run -p 3000:3000 yourname/my-app:1.0

✔ 完成

👍 优点
最专业 ✔
支持版本管理 ✔
团队协作必备 ✔
四、方式 3：给源码 + Dockerfile（最常见）

👉 其实公司里最常用的是这个

你只需要给：

项目代码
Dockerfile
📥 对方操作
docker build -t my-app .
docker run -p 3000:3000 my-app
👍 优点
灵活（可以自己改代码）
适合开发阶段