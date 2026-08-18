# Docker

Docker 是一个应用容器化工具，解决“我电脑能跑，你电脑跑不了”的问题。

Docker = 应用 + 运行环境

比如公司接手一个两年前的 Vue2 项目，要求使用 Node.js 16 + npm 8。你的电脑装的是 Node.js 22，执行 npm install 后各种依赖报错。

用 Docker 可以把指定版本的 Node 和依赖环境一起打包，团队成员只需 docker run 就能启动项目，无需折腾环境配置。

## 举例

要开发一个 React + Node.js + MySQL + Redis 的项目

没有 Docker： 一个全栈项目需要手动安装和配置 Node.js、MySQL、Redis（React 项目也依赖 Node 环境），还要处理版本、端口、账号密码等问题，换台电脑往往要重新搭建一遍（部署）。

有了 Docker： 把 React 前端、Node 后端、MySQL、Redis 分别打包成容器，只需一份 docker-compose.yml，执行一条 docker compose up，整个项目就能一键启动，所有人的开发环境保持一致。

## nvm 

## Docker 安装

![docker](https://docs.docker.com/desktop/?_gl=1*103sn87*_gcl_au*MTA3MTg3OTEyNC4xNzg2ODg3OTA5*_ga*MTU4MTcxMTg1MS4xNzc2NTkwODUx*_ga_XJWPQMJYHQ*czE3ODY4ODc5MDkkbzIkZzEkdDE3ODY4ODgwMjEkajM2JGwwJGgw)

docker --version

配置 Docker Engine 

{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}

## 容器 container 

容器好比打包好的行李箱，把应用和依赖全装进去，在哪跑都一样，不用操心环境差异。

### hello world 

Docker 下载极小的 `hello‑world`镜像，启动容器打印一段提示文字，跑完立刻退出，用来验证 Docker 环境正常。

docker run hello-world

先下载 hello‑world 镜像，创建并启动容器，容器输出提示信息后终止，以此校验 Docker 引擎镜像、容器运行链路是否正常。

镜像 = 光盘
容器 = 放光盘的vcd  多个容器可以共用一个镜像

## 镜像docker images
docker rmi eb84fdc6f2a3

## 容器
docker ps -a
docker stop feaeff9de356
docker run hello-world
docker rmi hello-world 
删除镜像

## nginx demo

- demo 
  index.js
  :123
- docker pull nginx
- docker images
- docker run --name my-npe0o-2-=e3iue3iy2er8fjvkjddikginx -p 80:80 -v /Users/shunwuyu/workspace/lesson/ai_lesson/docker/demo/nginx.conf:/etc/nginx/nginx.conf -d nginx

docker run = 创建容器 + 配置容器 + 启动容器

创建容器

docker run nginx
命名

--name my-nginx
端口映射

-p 80:80
-p 主机端口:容器端口
文件挂载 -v
后台运行 -d

## mysql
docker pull mysql:8.0

docker run -d \
  --name mysql-demo \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  mysql:8.0

安装navicat
https://www.navicat.com.cn/download/navicat-for-mysql