# jsop 有些古老了 有什么缺点？

JSONP（JSON with Padding）主要用于跨域请求，但存在多个缺点：

安全性差：容易遭受XSS攻击，因为它是通过<script>标签加载数据，无法有效验证来源。
仅支持GET请求：限制了其在复杂场景中的应用，如提交表单或上传文件。
错误处理弱：难以捕获和处理HTTP错误，回调函数通常只在成功时触发。
性能问题：加载额外的<script>标签会阻塞页面渲染，影响性能。
现代应用推荐使用CORS替代JSONP。

- 跨域方案
  - jsonp
  - cors
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
  - 代理
  - websocket
    websocket-demo
    WebSocket协议不遵循同源策略，允许跨域通信，因为它在建立连接时通过HTTP请求进行握手，之后的通信独立于原始的HTTP请求，直接在TCP层进行。
  - postMessage
    html5 特性
    postMessage是浏览器提供的API，允许不同源的窗口或iframe之间安全地发送消息，实现跨域通信。
    一个电商平台的主页面（域名为example.com）嵌入了一个支付服务提供商的iframe（域名为paymentservice.com）。通过postMessage，主页面可以安全地向iframe发送支付信息，而iframe可以返回支付状态更新给主页面，实现无缝的跨域交互。
