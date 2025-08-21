- HTTP 是明文传输协议，数据不加密；HTTPS 通过 SSL/TLS 加密数据（SSL/TLS就像快递信封，HTTPS用它把数据包好，防偷看防篡改，安全送达。），提供更高的安全性，防止数据被窃听和篡改。
- 输入http://www.baidu.com 会怎么样？
  1.  DNS 查询
  浏览器首先进行 DNS 查询，将域名 www.baidu.com 解析为对应的 IP 地址。例如，假设解析结果是 180.101.49.12.
  2. 建立 TCP 连接
  浏览器与该 IP 地址的服务器建立 TCP 连接，使用默认的 HTTP 端口（80）。
  3. 发送 HTTP 请求
  浏览器通过已建立的 TCP 连接向服务器发送一个 HTTP 请求，请求内容类似于：
  ```
  GET / HTTP/1.1
  Host: www.baidu.com
  ```
  4. 服务器响应重定向
  百度服务器收到 HTTP 请求后，检查请求是否符合其安全策略。如果服务器配置了强制 HTTPS 访问，则会返回一个 301 或 302 重定向响应：

  301 Moved Permanently 请求的资源已永久移动到新的 URL。
  xiaomi.com -> mi.com
  302 Moved Temporarily HTTP/1.1 规范中被正式更名为 "Found"。 请求的资源暂时位于另一个 URL。
  ReactRouter Navigate
  用户登录后跳转回原页面

  307 请求的资源临时被重定向到了另一个 URL，且后续请求仍应使用原 URL。
  与 302 类似，但 307 严格要求保持原始请求方法（如 POST 不得变成 GET），而 302 在某些客户端中可能改变方法。

✅ 适用于需要保持 POST、PUT 等方法的临时跳转。

  举出例子
  用户在网页上填写转账信息，点击“提交”。
  请求发送到：
  POST /transfer-money
  服务器正在进行临时维护，处理转账的后端服务暂时迁移到另一个地址：
  https://backup-server.example.com/transfer-money

  用户能顺利完成转账（不能丢数据）
  但只是临时换地方处理，维护完还要切回原地址
  并且必须保持是 POST 请求（不能变成 GET，否则数据会丢失！）

  返回 307

  HTTP/1.1 307 Temporary Redirect
Location: https://backup-server.example.com/transfer-money

  如果用 302 呢？
  有些旧浏览器或客户端收到 302 后，会把 POST 请求自动改成 GET 请求重发。

  请求变成：GET /transfer-money?...
  数据暴露在 URL 中（极不安全
  服务器收不到完整数据，

  ```
  HTTP/1.1 307 Internal Redirect
  Location: https://www.baidu.com/
  ```
  5. 浏览器接收重定向响应
  浏览器接收到这个重定向响应，并根据 Location 头部字段中的 URL (https://www.baidu.com/) 发起新的请求。

  6. 重新进行 DNS 查询（如果需要）

  如果浏览器缓存中没有 https://www.baidu.com 的 DNS 记录，可能会再次进行 DNS 查询以获取相同的 IP 地址。

  7. 建立 SSL/TLS 连接

  浏览器与服务器建立一个新的 TCP 连接，这次使用 HTTPS 端口（443），并通过 SSL/TLS 协议进行加密通信。
  握手过程：包括客户端和服务器之间的密钥交换、证书验证等步骤，确保连接的安全性。

  8. 发送 HTTPS 请求

  在 SSL/TLS 连接建立完成后，浏览器通过该加密连接发送 HTTPS 请求：

  9. 服务器处理 HTTPS 请求并返回响应

  10. 浏览器解密并渲染页面

  301 (Moved Permanently) 表示永久重定向，302 (Found) 表示临时重定向，307 (Temporary Redirect) 也表示临时重定向但要求客户端使用原HTTP方法请求新URL。