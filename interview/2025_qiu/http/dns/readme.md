# dns

- 全称
Domain Name System

- 一句话说清 DNS
DNS = 把域名解析成IP的分布式数据库系统；浏览器在真正发起 HTTP(S) 请求前，通常都会先做一次（或命中缓存的）DNS 解析。

- 一条命令
ping www.baidu.com

```
ping www.baidu.com
PING www.a.shifen.com (36.152.44.93): 56 data bytes
```
- www.baidu.com 实际上是一个 CNAME 记录，它指向了 www.a.shifen.com。
    CNAME记录是域名的别名指向，指向另一个域名。
- a.shifen.com 是 百度（Baidu）用于其搜索服务的内部域名系统。
    - 负载均衡
        分流用户请求，避免单台服务器过载
    - CDN（内容分发网络）
        根据你的位置返回离你最近的百度服务器 IP
        静态资源
    - 动态调度（根据用户地理位置返回最优服务器）

    你访问的 www.baidu.com，其实只是一个“入口”。
    真正提供网页内容的是背后成千上万的服务器，它们通过 a.shifen.com、b.shifen.com 等域名进行管理和调度。

- 解析流程图
    浏览器查 内存缓存 → 系统缓存 → hosts。
    chrome://net-internals/#dns
    系统缓存 ipconfig /displaydns  windows
    - Windows host 文件配置说明
    C:\Windows\System32\drivers\etc\hosts
    127.0.0.1   www.testsite.com
    ipconfig /flushdns
    mac vi /etc/hosts 
    127.0.0.1 www.bilibili.com
    未命中 → 向“递归解析器”查询
    把结果缓存并返回 （相当于网络“跑腿小哥”）
    一级一级往上问
    - 先问“根域名服务器”
        .com 这个后缀的服务器在哪？”
        根服务器说：“.com 的地址是 XXX，你去找它。”
        预先内置（写死）在 DNS 软件里！
        明文写着13组根服务器的 IP 地址和域名。
        A.ROOT-SERVERS.NET.      3600000  IN  A   198.41.0.4
        B.ROOT-SERVERS.NET.      3600000  IN  A   192.228.79.201
        C.ROOT-SERVERS.NET.      3600000  IN  A   192.33.4.12
        这些地址非常稳定，几十年都不变，所以可以“写死”。
    - 再问“.com 域名服务器”
        taobao.com 的服务器在哪？
        它说：“我知道，是 YYY，你去找它。”
    - 最后问“taobao.com 的权威服务器”（像学校图书馆）
        www.taobao.com 的IP是多少？
        它说：“是 116.116.116.116。”
    -  第四步：把结果带回来，告诉你电脑
        递归解析器拿到 IP 地址后，返回给你电脑
        同时它自己也记下来（缓存起来），下次别人问就不用再跑一遍了
    - 第五步：你的电脑用这个IP去访问网站
        浏览器就可以建立连接，打开网页啦！

- 与前端强相关的性能与体验
    - 提前解析 www.taobao.com
    <link rel="dns-prefetch" href="//g.alicdn.com"/> 
    - 提前简历链接
    <link rel="preconnect" href="https://cdn.example.com" crossorigin>
    
    