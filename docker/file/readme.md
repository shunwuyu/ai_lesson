# Dockerfile

蜜雪冰城的**标准操作手册（SOP）**， 写清 "先加茶底、再加奶、放 3 勺糖、摇匀"，任何人照着做，出来的味道都一样， 就成了连锁店。

Dockerfile 是一个**文本配方文件**，里面写着一步步 "做菜" 的指令，Docker 照着它就能自动做出一个一模一样的 Docker 镜像， 运行开吃。

## 最简单的例子：Hello World
第 1 步：创建项目
mkdir my-docker-demo && cd my-docker-demo
新建一个 `index.js`：
```
console.log("Hello, Docker! 我跑在容器里啦 🐳");
```
第 2 步：写 Dockerfile
```
# 1. 选一个基础镜像（相当于选锅和灶）
FROM node:18-alpine

# 2. 设置工作目录（相当于在容器里切到 /app 文件夹）
WORKDIR /app

# 3. 把本地代码复制进容器（相当于把食材放进锅）
COPY index.js .

# 4. 容器启动时执行的命令（相当于开火做菜）
CMD ["node", "index.js"]
```

指令	作用	类比
FROM	基础镜像，必须是第一行	选什么锅底
WORKDIR	设置工作目录	切到操作文件夹
COPY	把本地文件复制进镜像	放食材
RUN	构建时执行命令（装依赖）	提前腌制
EXPOSE	声明容器监听端口	留个出餐口
CMD	容器启动时默认执行的命令	开火开做


第 3 步：构建镜像
```
docker build -t my-hello .
```
`-t my-hello`：给镜像起名字

- `-t my-hello`：给镜像起名字
- `.`：表示 Dockerfile 在当前目录

第 4 步：运行容器

```
docker run my-hello 
```

Dockerfile 是发布项目的标准方式之一。

# 登录 Docker Hub
docker login

# 打标签
docker tag your-project-name your-dockerhub-username/your-project-name:latest

# 推送
docker push your-dockerhub-username/your-project-name:latest

4. 部署运行

# 任何机器上拉取运行
docker pull your-dockerhub-username/your-project-name:latest
docker run -p 3000:3000 your-dockerhub-username/your-project-name:latest

## todos 应用
- 前端 如代码
- 后端 如代码
- vite 代理
- nginx 代理

docker build -f Dockerfile.api -t todos-api . --no-cache
docker build -f Dockerfile.web -t todos-web . --no-cache

docker-compose up -d 