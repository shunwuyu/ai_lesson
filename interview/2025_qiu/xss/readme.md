# xss 跨站脚本攻击

“XSS 就是攻击者把恶意脚本注入到页面中，让浏览器执行，常见有存储型、反射型、DOM 型。
典型例子是评论区直接输出 <script>，或者前端用 innerHTML 把用户输入插入 DOM。
防御核心是输出转义，无论前后端都要对用户输入进行编码，并使用安全模板；前端避免使用 innerHTML，改用 textContent。
进一步可以开启 CSP、设置 HttpOnly Cookie 来降低攻击收益。
我平时在 React/Vue 中会依赖框架默认转义，但涉及富文本会使用 DOMPurify 做白名单过滤。”

```
一个博客评论系统直接渲染用户输入：
<div class="comment">
  <!-- 攻击者输入 -->
  <script>alert('你被黑了')</script>
</div>
读取 document.cookie 发给攻击者；
伪造请求发起转账/修改密码。
```
对用户输入进行HTML转义，将 < 转为 &lt;，> 转为 &gt;，使脚本变为纯文本，防止浏览器解析执行，即可防御此类存储型XSS。

```
<input id="name" />
<div id="preview"></div>
<script>
nameInput.oninput = () => {
  preview.innerHTML = nameInput.value;
};
</script>
```
DOM 型（即时执行）
输入 <img src=x onerror=alert(1)> 立刻执行。
改用textContent

- 反射型 XSS 
搜索页面将关键词直接显示在结果中。
http://example.com/search?keyword=<script>alert('XSS')</script>
const keyword = new URLSearchParams(location.search).get('keyword');
document.getElementById('result').innerHTML = `搜到 "${keyword}" 的结果`; 

用 textContent 代替 innerHTML
输入验证：过滤或限制特殊字符（如 <, >
使用 CSP（内容安全策略）
<meta http-equiv="Content-Security-Policy" content="default-src 'self';">
禁止内联脚本执行。
编码输出：在服务端对动态内容进行 HTML 编码（如 &lt;script&gt;）

永远不要信任用户输入，任何动态内容插入页面前都必须转义或验证。

- react 中防xss
  
  DOMPurify 是一个安全可靠的库，用于净化 HTML 字符串，自动移除 XSS 恶意标签和脚本，确保在使用 dangerouslySetInnerHTML 时内容安全。

- HttpOnly Cookie
  设置 Set-Cookie: session=xxx; HttpOnly，禁止 JS 读取 cookie。

- 编码策略
  encodeURIComponent。
const name = "张三&年龄=20";
const encoded = encodeURIComponent(name);
 反射型就没问题了


## csrf 跨站请求伪造

CSRF（跨站请求伪造）是一种攻击，黑客诱导用户在已登录状态下访问恶意网站，偷偷以用户身份向目标网站发送非本意的请求（如转账、改密码），因携带了用户的 Cookie 而被服务器误认为合法操作。

----- 
银行转账

你已登录银行网站 bank.com，Cookie 中有登录信息。

攻击者发你一封钓鱼邮件，里面有一个 <img>：

<img src="https://bank.com/transfer?to=attacker&amount=1000">


你一打开邮件，浏览器在未察觉的情况下自动带上 bank.com 的 Cookie请求转账接口。

银行后台收到请求，以为是你本人操作 → 转账成功。

确保请求来自真实用户操作，而非伪造。

常用防御方法： CSRF Token（最常用）
服务器在页面中植入一个随机 token（如 <input type="hidden" name="csrf_token" value="...">）
提交表单或请求时，必须携带该 token
服务器验证 token 是否有效
攻击者无法获取 token，故伪造请求会失败（因为 CSRF Token 由服务器生成并存储在用户当前会话（Session）中，且只在同源页面中可见。）

--- 
论坛改密码

你在 forum.com 已登录
攻击页面：

<form action="https://forum.com/api/changePwd" method="POST">
  <input type="hidden" name="newPwd" value="hacked" />
</form>
<script>document.forms[0].submit()</script>


只要你访问这个恶意页面，浏览器自动带上 Cookie，就把密码改了。

- SameSite Cookie （浏览器层防御）
  Set-Cookie: session=abc; SameSite=Lax; HttpOnly

  Strict：完全禁止跨站携带 Cookie，安全最高，但可能影响第三方登录。
  Lax：允许 GET 导航携带（默认值），一般够用。
  None + Secure：跨站可携带，但必须是 HTTPS。

  Lax 意思是：跨站发请求时，比如图，不带 Cookie；只有用户主动跳转（如点链接）才带。这样黑客用 <img> 或自动请求偷摸转账，Cookie 不带上，服务器就不认，CSRF 就没法搞。

  - 后端检查 Origin 或 Referer 头是否来自本站域名。
  if (req.headers.origin !== 'https://mybank.com') reject();


  我们项目中后端统一使用 SameSite=Lax + CSRF Token 双重防御，



