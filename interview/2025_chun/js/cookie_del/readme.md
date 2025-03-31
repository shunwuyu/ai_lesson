# cookie的属性

- Domain（域名）
    指定Cookie可以发送到哪些域名
    document.cookie = "token=123; domain=.company.com";

- Path（路径）
    // 只在后台管理系统路径下可用
    document.cookie = "adminToken=123; path=/admin";

- Expires/Max-Age（过期时间）
    设置Cookie的有效期
    // 记住登录状态7天
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = `token=123; expires=${expires.toUTCString()}`;
    // 或使用Max-Age（秒数）
    document.cookie = "token=123; max-age=604800"; // 7天

- Secure（安全）
    只在HTTPS连接中传输
    document.cookie = "creditCard=1234; secure";

- HttpOnly（HTTP专用）
    禁止JavaScript访问Cookie，防止XSS攻击
    // 服务端设置
Set-Cookie: sessionId=abc123; HttpOnly
// 防止前端JS通过document.cookie访问

- SameSite（同站限制）
    控制跨站请求时是否发送Cookie

    // Strict: 完全禁止第三方Cookie
document.cookie = "token=123; SameSite=Strict";

// Lax: 允许部分跨站请求（默认值）
document.cookie = "token=123; SameSite=Lax";

// None: 允许跨站请求，必须配合Secure
document.cookie = "token=123; SameSite=None; Secure";


- 如何删除 

// 设置cookie 7天过期
document.cookie = `token=123; max-age=${7 * 24 * 60 * 60}; path=/`;

// 删除cookie（通过设置过期时间为过去时间）
document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
