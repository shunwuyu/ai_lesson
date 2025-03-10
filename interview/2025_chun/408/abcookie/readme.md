b.com 下携带上 Cookie, 在a.com 下能拿到吗？
tmall.com  https://www.fliggy.com/

在浏览器中，由于同源策略（Same-Origin Policy）的限制，a.com 无法直接访问 b.com 的 Cookie。Cookie 是与特定域名关联的（domain），只能由设置它们的域名访问。跨域资源共享（CORS）机制也不允许一个域名读取另一个域名的 Cookie，除非通过配置 document.domain（仅限父子域）或使用跨域请求并配合服务器端设置适当的 CORS 头。简而言之，a.com 不能直接获取 b.com 的 Cookie。

- 父子域
  parent.a.com 和 child.a.com
  document.domain = 'a.com';
  console.log(document.cookie); 

- CORS 跨域传递cookie
  Access-Control-Allow-Credentials true 允许发送凭证（Cookies）
  sameSite: 'none' 不要求同源

- 为什么taobao.com 登陆了， tmall 不需要再登录？
  - 登录互通
  - Cookie/Session的跨域共享
  - 用户登录淘宝
  用户在 taobao.com 登录成功后，服务器会在用户的浏览器上设置一个包含身份令牌的 Cookie。
  ```
  Set-Cookie: sso_token=abc123; domain=.alibaba.com; path=/; secure; HttpOnly
  ```
  alibaba 共同父域 管理 taobao tmall 
  步骤 2：访问天猫时加载 JSONP 脚本
  <script src="https://taobao.com/login_api.do?callback=myCallback"></script>

  步骤 3：服务器处理 JSONP 请求

  taobao.com 的服务器接收到请求后，识别出请求中的 sso_token Cookie（因为它设置了 domain=.alibaba.com），然后生成一个包含用户身份信息的 JSONP 响应：

  myCallback({ user: "username", token: "abc123" });

  步骤 4：前端处理 JSONP 响应

  function myCallback(data) {
    console.log('User:', data.user);
    console.log('Token:', data.token);
    // 可以在这里进行进一步的操作，比如设置本地存储或显示用户信息
  }

  步骤 5：设置本地 Cookie 或 Token

  document.cookie = `tmall_sso_token=${data.token}; domain=.tmall.com; path=/; secure`;

  XSS 攻击 

  Secure 标志确保 Cookie 仅通过 HTTPS 传输，防止在未加密的 HTTP 连接中被窃取，增强安全性。

## 使用 CORS 和 SSO 的典型流程：
  SSO（单点登录）是一种认证机制，允许用户通过一次登录即可访问多个相关但独立的系统或应用，无需重复输入凭证，提升用户体验和安全性。

  - 用户在 taobao.com 登录，服务器生成身份令牌并设置共享 Cookie（如 sso_token），domain 为 .alibaba.com。
  - 访问 tmall.com 时，页面发起带凭证的请求（credentials: 'include'）到 taobao.com 的 SSO 服务。
  - 浏览器自动附上共享 Cookie，SSO 服务验证用户身份并返回认证信息。
  - tmall.com 接收到认证信息，确认用户已登录，实现无缝访问，无需再次登录。
