# 跨站脚本注入、跨站请求伪造，如何预防

- 跨站脚本注入（XSS）是攻击者通过在网页中注入恶意脚本，窃取用户信息或执行未授权操作的攻击方式。
    <script>alert('XSS Attack!');</script>
    假设有一个评论系统，用户可以在网页上发布评论。如果系统没有对用户输入进行适当的过滤和转义，攻击者可以提交以下恶意评论：

    - 窃取用户信息：攻击者可以通过脚本获取用户的 cookies、会话信息等。
    - 重定向用户：将用户重定向到恶意网站。
    - 篡改页面内容：修改网页内容，进行钓鱼攻击。

    - 防范措施
        - 对用户输入进行严格的验证和过滤。
        - 使用 HTML 实体转义特殊字符（如 <, >, &）。
        - sanitize-html：
        ```
             const cleanHTML = sanitizeHtml(userInput, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
                'a': ['href']
            }
            });
        ```

- 跨站请求伪造
    - 跨站请求伪造（CSRF）是一种攻击方式，攻击者诱使用户在已认证的会话中执行未授权操作，利用用户的身份进行恶意请求。
    - 假设用户已登录到一个在线银行网站，并且该网站允许用户通过发送 POST 请求来转账资金。攻击者可以利用 CSRF 攻击，诱使用户在不知情的情况下执行转账操作。
    - 攻击步骤
        1. 用户登录：用户在银行网站上登录并保持会话。
        2. 恶意网站：攻击者创建一个恶意网站，并在该网站上嵌入以下 HTML 代码：
        ```js
        <form action="https://bank.com/transfer" method="POST" style="display:none;">
            <input type="hidden" name="amount" value="1000">
            <input type="hidden" name="to" value="attacker_account">
        </form>
        <script>
            document.forms[0].submit();
        </script>
        ```
        3. 用户访问恶意网站：用户在登录状态下访问攻击者的恶意网站。
        4. 自动提交请求：恶意网站的脚本会自动提交表单，向银行网站发送转账请求。

    防护措施
        - 为了防止 CSRF 攻击，开发者可以采取以下措施：
        使用 CSRF Token：在每个敏感操作中生成唯一的 CSRF Token，并在请求中验证。
        - SameSite Cookie 属性：设置 Cookie 的 SameSite 属性，限制跨站请求。
        Strict：
        描述：仅在同一站点的请求中发送 Cookie。即使是用户点击链接或提交表单，Cookie 也不会在跨站请求中发送。
        场景：适用于需要高度安全的操作，如支付或敏感数据访问。
             Set-Cookie: sessionId=abc123; SameSite=Strict
             
        - 验证 Referer 头：检查请求的 Referer 头，确保请求来源于可信的域。