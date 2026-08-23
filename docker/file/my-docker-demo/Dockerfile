# 1. 选一个基础镜像（相当于选锅和灶）
FROM node

# 2. 设置工作目录（相当于在容器里切到 /app 文件夹）
WORKDIR /app

# 3. 把本地代码复制进容器（相当于把食材放进锅）
COPY index.js .

# 4. 容器启动时执行的命令（相当于开火做菜）
CMD ["node", "index.js"]
