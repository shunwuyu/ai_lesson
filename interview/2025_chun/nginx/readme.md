- ngnix 是什么
  Nginx是一个高性能的HTTP和反向代理服务器，用于处理静态内容、负载均衡及加速Web应用。
- 为什么服务器需要ngnix 
  Nginx作为高效的反向代理服务器，能处理大量并发请求，提升网站性能，增强安全性并支持负载均衡。
- Nginx的高性能体现在其异步事件驱动架构，支持高并发连接，快速响应请求及高效资源利用。
- 何为反响代理
  反向代理是一种服务器架构，通过代理客户端请求到后端服务器，并将响应返回给客户端，增强安全性和性能。
  
  server {
    listen 80;  # 监听80端口的HTTP请求

    server_name your_domain_or_ip;  # 你的域名或服务器IP地址，请替换为实际值

    location / {
        proxy_pass http://127.0.0.1:5173;  # 将请求转发到本机的5173端口
        proxy_set_header Host $host;       # 确保原始请求的Host头部被正确转发
        proxy_set_header X-Real-IP $remote_addr; # 获取客户端真实IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 添加转发链信息
        proxy_set_header X-Forwarded-Proto $scheme; # 前端使用的协议(http或https)
    }
}

- 为何叫反向？
  反向代理之所以称为“反向”，是因为它代表客户端请求后端服务器，并将响应返回给客户端，隐藏了后端服务器的真实地址，与正向代理方向相反。
  正向代理用户  正向代理的例子是用户通过代理服务器访问互联网，如使用公司网络上网或绕过地理限制，代理隐藏了用户的IP地址 

  “梯子”上网

- 部署项目