- 把www.bilibli.com 的域名指向127.0.0.1 怎么做？
  修改本机的 hosts 文件
  C:\Windows\System32\drivers\etc
  hosts
  127.0.0.1 www.bilibili.com

  # 注释

- 丛域名解析到dns得到最终ip, 整个过程是怎么样的？查找过程
  域名解析就是dns查询
  1. 用户输入域名 www.bilibili.com
  2. 浏览器查询本地缓存 如果找到，则直接使用这个 IP 地址进行连接。
  chrome://net-internals/#dns
  数组， 负载均衡， 距离， 
  3. 查询操作系统缓存
  4. 查询 hosts 文件
  5. 发送 DNS 请求
    本地 DNS 解析器 -> 根 DNS 服务器(TLD .com) -> 权威 DNS 服务器->返回IP 地址
  6. 缓存 IP
  7. 建立 TCP 连接，并发送 HTTP/HTTPS 请求

  - 得到IP地址的最终目的是为了将域名转换为可路由的网络地址，使计算机能够识别并连接到目标服务器，实现数据传输和网络通信。
  
  - IP地址是网络通信的基础，它为每个连接到网络的设备提供唯一的标识符，使得数据能够在不同设备之间准确传输和路由。

  - 通过dns 解析得到127.0.0.1, 本身也应该得到www.bilibili.com 的ip 为什么需要这一步？
  - dns 解析的作用
    hosts 优先
    DNS缓存减少了重复的域名解析请求，加快了网络访问速度，降低了DNS服务器负载，提高了用户体验和网络效率。
  
