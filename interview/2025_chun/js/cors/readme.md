# 跨域

浏览器同源策略是跨域根源。协议、域名、端口任一不同即跨域。它为保护用户数据安全，防止恶意网站窃取本地信息、篡改页面、发起非法请求，限制非同源网页读写资源与接口通信，后端服务器通信不受该策略约束。

## jsop 有些古老了 有什么缺点？

JSONP（JSON with Padding），主要用于跨域请求
JSONP 最大的优点在于它极高的浏览器兼容性和实现的简单性。

但存在多个缺点：

安全性差：容易遭受XSS（ Cross-Site Scripting）攻击，因为它是通过<script>标签加载数据，无法有效验证来源。
仅支持GET请求：限制了其在复杂场景中的应用，如提交表单或上传文件。
错误处理弱：难以捕获和处理HTTP错误，回调函数通常只在成功时触发。
性能问题：加载额外的<script>标签会阻塞页面渲染，影响性能。
现代应用推荐使用CORS替代JSONP。

案例 https://github.com/shunwuyu/ai_lesson/tree/8984bb879381ceb88f77d3a134627acb11809241/js/cross_domain/jsonp

- 跨域方案
  - jsonp
  - cors
    简单 https://github.com/shunwuyu/ai_lesson/tree/8984bb879381ceb88f77d3a134627acb11809241/js/cross_domain/simple-cors

    复杂要预检的
    https://github.com/shunwuyu/ai_lesson/tree/8984bb879381ceb88f77d3a134627acb11809241/js/cross_domain/cors-demo

    Access-Control-Allow-Origin
    示例：Access-Control-Allow-Origin: https://example.com
    Access-Control-Allow-Methods
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers
    示例：Access-Control-Allow-Headers: Content-Type, 
    Access-Control-Allow-Credentials
    Access-Control-Allow-Credentials: true
    指示是否允许发送凭据（如Cookies、HTTP认证信息）。

    预检请求
    CORS预检请求（Preflight Request）是一种HTTP OPTIONS请求，浏览器自动发送以检查实际请求是否安全。
    - 使用了非简单方法（如PUT、DELETE等，而不是GET或POST）。
    - 使用了自定义的请求头（如X-Custom-Header）。
    - 请求内容类型不是application/x-www-form-urlencoded、multipart/form-data或text/plain。

    ```
    const Koa = require('koa');
    const cors = require('@koa/cors');
    const app = new Koa();

    app.use(cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization']
    }));
    ```

  同源策略限制， 但为什么后端设置 Access-Control-Allow-Origin又可以？

  - 同源策略是浏览器默认封杀跨域请求，安全锁先锁死；
  - Access-Control-Allow-Origin 是后端主动给浏览器发通行证；
  - 浏览器看到合法响应头，就知道是后端允许的，直接放行跨域，不再拦截。
  本质：默认禁止 + 后端授权白名单，双向配合解除限制。

  - 前端反向代理
  vite_proxy
  Nginx 核心配置代码（负载均衡）
nginx
# 负载均衡配置
upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

代理转发
server {
    listen 80;
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }
}
负载均衡 一句话解释
把用户的请求，均匀分给多台后端服务器，防止单台压力过大，让网站更稳、更快、扛得住高并发。

  - websocket
    websocket-demo
    WebSocket协议不遵循同源策略，允许跨域通信，因为它在建立连接时通过HTTP请求进行握手，之后的通信独立于原始的HTTP请求，直接在TCP层进行。
  - postMessage
    html5 特性
    postMessage是浏览器提供的API，允许不同源的窗口或iframe之间安全地发送消息，实现跨域通信。
    一个电商平台的主页面（域名为example.com）嵌入了一个支付服务提供商的iframe（域名为paymentservice.com）。通过postMessage，主页面可以安全地向iframe发送支付信息，而iframe可以返回支付状态更新给主页面，实现无缝的跨域交互。


## 反向代理解决跨域和vite解决有什么区别？

反向代理是通过服务器转发请求，使浏览器始终访问同源地址，从而绕过同源策略限制。
Vite 解决跨域本质上也是使用了反向代理，只不过是开发阶段由 dev server 帮我们做了一层封装。
两者的核心区别在于：Vite 代理只用于开发环境，而真正上线时通常需要通过 Nginx 等反向代理来实现跨域和流量控制。
在生产环境中，反向代理不仅能解决跨域，还可以做负载均衡、缓存和安全控制，这是 Vite 无法替代的。

浏览器 (http://localhost)
        ↓
Nginx (http://localhost/api)
        ↓
后端服务器 (https://api.example.com)

```
server {
    listen 80;  # 监听端口
    server_name localhost;  # 当前服务域名

    # 前端静态资源（可选）
    location / {
        root   /usr/share/nginx/html;
        index  index.html;
    }

    # 👇 核心：代理 /api 请求
    location /api/ {

        # 👉 目标服务器地址（后端接口）
        proxy_pass https://api.example.com/;

        # 👉 修改请求头中的 Host（避免后端识别错误）
        proxy_set_header Host $host;

        # 👉 获取真实客户端 IP（生产环境常用）
        proxy_set_header X-Real-IP $remote_addr;

        # 👉 转发客户端 IP 链（多层代理时用）
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 👉 支持 https 场景（有些接口需要）
        proxy_set_header X-Forwarded-Proto $scheme;

        # 👉 关闭缓存（调试接口时很重要）
        proxy_cache_bypass $http_upgrade;
    }
}
```